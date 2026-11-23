import { useState, useEffect, useRef } from "react";
import AnalysisProgress from "./features/AnalysisProgress.jsx";
import AnalysisComplete from "./features/AnalysisComplete.jsx";
import InteractiveMap from "./features/InteractiveMap.jsx";
import SearchResults from "./features/SearchResults.jsx";
import SearchResultsDetails from "./features/SearchResultDetails.jsx";
import ComponentDetails from "./features/ComponentDetails.jsx";
import DependencyDetails from "./features/DependencyDetails.jsx";
import Welcome from "./features/welcome.jsx";
import Login from "./features/login.jsx";
import Signup from "./features/signup.jsx";
import Home from "./features/Home.jsx";
import AddRepository from "./features/AddRepository.jsx";
import Repositories from "./features/Repositories.jsx";
import RepositoryDetails from "./features/RepositoryDetails.jsx";
import AnalysisResults from "./features/AnalysisResults.jsx";
import Profile from "./features/Profile.jsx";
import ForgotPassword from "./features/ForgotPassword.jsx";
import CheckEmail from "./features/CheckEmail.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [repositories, setRepositories] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(() => {
    const savedId = sessionStorage.getItem("selectedRepoId");
    return savedId ? { id: Number(savedId) } : null;
  });
  const [removedRepos, setRemovedRepos] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [analysisUrl, setAnalysisUrl] = useState("");
  const [step, setStep] = useState(0);
  const [analysisError, setAnalysisError] = useState("");
  const [selectedComponent, setSelectedComponent] = useState({});
  const activeAnalysis =
    analysis?.repository?.id === selectedRepo?.id ? analysis : null;
  const [page, setPage] = useState(
    () => (sessionStorage.getItem("user") ? "home" : "welcome")
  );

  const [emailRequest, setEmailRequest] = useState({
    email: "",
    purpose: "",
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  function handleLogout() {
    setUser(null);
    setPage("welcome");
  }

  function removeRepository(name) {
    setRemovedRepos((prev) => [...prev, name]);
  }
  async function removeCompletedRepository(id) {
    try {
      const response = await fetch(`/api/repositories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      setRepositories((previous) => previous.filter((repo) => repo.id !== id));
      setSelectedRepo(null);
      setAnalysis(null);
      setPage("home");
    } catch {
      window.alert("Couldn't remove the repository. Please try again.");
    }
  }
  const [repoSearch, setRepoSearch] = useState("");
  const [repoBack, setRepoBack] = useState("home");
  function addRepository(url) {
    setRepositories([...repositories, url]);
  }
  const currentRun = useRef(null);

  function stopAnalysis() {
    const run = currentRun.current;
    currentRun.current = null;
    if (!run) return;

    clearInterval(run.timer);
    run.controller.abort();
  }

  function leaveAnalysis(nextPage) {
    stopAnalysis();
    setPage(nextPage);
  }

  function cancelAnalysis() {
    stopAnalysis();
    setAnalysisError("Analysis cancelled.");
    setPage("analysis-error");
  }

  async function startAnalysis(url) {
    stopAnalysis();
    setAnalysisUrl(url);
    setAnalysisError("");
    setPage("progress");

    const progressId = crypto.randomUUID();
    setStep(0);

    const run = { controller: new AbortController() };
    currentRun.current = run;
    const signal = run.controller.signal;

    run.timer = setInterval(async function () {
      try {
        const response = await fetch(`/api/analysis-progress/${progressId}`, {
          signal,
        });

        if (response.ok) {
          const data = await response.json();

          if (currentRun.current === run) {
            setStep((previous) => Math.max(previous, data.step));
          }
        }
      } catch (error) {}
    }, 500);
    try {
      const response = await fetch("/api/repositories/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, progressId }),
        signal,
      });
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Analysis failed. Please try again.");
      }
      if (currentRun.current !== run) return;

      if (!response.ok || !data?.repository) {
        throw new Error(data?.error || "Analysis failed");
      }
      setRepositories((previous) => [
        ...previous.filter((repo) => repo.id !== data.repository.id),
        data.repository,
      ]);

      setAnalysis(data);
      setSelectedRepo(data.repository);
      setPage("complete");
    } catch (error) {
      if (signal.aborted) return;
      setAnalysisError(error.message);
      setPage("analysis-error");
    } finally {
      if (currentRun.current === run) stopAnalysis();
    }
  }
  useEffect(() => {
    fetch("/api/repositories")
      .then((res) => res.json())
      .then((data) => setRepositories(data))
      .catch((error) => console.error(error));
  }, []);

  const selectedRepoId = selectedRepo?.id;

  useEffect(() => {
    if (!selectedRepoId) {
      sessionStorage.removeItem("selectedRepoId");
      return;
    }

    sessionStorage.setItem("selectedRepoId", String(selectedRepoId));
    const controller = new AbortController();

    async function loadAnalysis() {
      const response = await fetch(
        `/api/repositories/${selectedRepoId}/analysis`,
        { signal: controller.signal },
      );

      if (response.status === 404) {
        setAnalysis(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Bad response");
      }

      setAnalysis(await response.json());
    }

    loadAnalysis().catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

    return () => controller.abort();
  }, [selectedRepoId]);

  if (page === "welcome") {
    return <Welcome setPage={setPage} />;
  }

  if (page === "login") {
    return <Login setPage={setPage} setUser={setUser} />;
  }
  if (page === "signup") {
    return (
      <Signup
        setPage={setPage}
        setUser={setUser}
        setEmailRequest={setEmailRequest}
      />
    );
  }
  if (page === "home") {
    return (
      <Home
        user={user}
        setPage={setPage}
        setSelectedRepo={setSelectedRepo}
        search={repoSearch}
        setSearch={setRepoSearch}
        setRepoBack={setRepoBack}
        removedRepos={removedRepos}
        repositories={repositories}
      />
    );
  }

  if (page === "repositories") {
    return (
      <Repositories
        setPage={setPage}
        setSelectedRepo={setSelectedRepo}
        setRepoBack={setRepoBack}
        search={repoSearch}
        setSearch={setRepoSearch}
        removedRepos={removedRepos}
        repositories={repositories}
      />
    );
  }

  if (page === "add-repository" || page === "edit-repository-url") {
    return (
      <AddRepository
        setPage={setPage}
        startAnalysis={startAnalysis}
        key={page}
        initialUrl={page === "edit-repository-url" ? analysisUrl : ""}
        onRepositoryAdded={(repo) => {
          setRepositories((previous) => [...previous, repo]);
          setSelectedRepo(repo);
        }}
      />
    );
  }

  if (page === "map" || page === "map-highlight") {
    return (
      <InteractiveMap
        setPage={setPage}
        selectedRepo={selectedRepo}
        analysis={activeAnalysis}
        highlightedResult={
          page === "map-highlight" && activeAnalysis ? selectedResult : null
        }
        onViewComponent={(node) => {
          setSelectedComponent(node);
          setPage("componentdetails");
        }}
      />
    );
  }

  if (page === "progress" || page === "analysis-error") {
    return (
      <AnalysisProgress
        setPage={leaveAnalysis}
        url={analysisUrl}
        error={analysisError}
        cancelAnalysis={cancelAnalysis}
        startAnalysis={startAnalysis}
        step={step}
      />
    );
  }

  if (page === "complete") {
    return (
      <AnalysisComplete
        setPage={setPage}
        analysis={activeAnalysis}
        removeCompletedRepository={removeCompletedRepository}
      />
    );
  }

  if (page === "searchresult") {
    return (
      <SearchResults
        setPage={setPage}
        setSelectedResult={setSelectedResult}
        analysis={activeAnalysis}
        selectedRepo={selectedRepo}
      />
    );
  }

  if (page === "searchresultdetails") {
    return (
      <SearchResultsDetails
        setPage={setPage}
        result={selectedResult}
        repository={activeAnalysis?.repository}
      />
    );
  }

  if (page === "dependencydetails") {
    return (
      <DependencyDetails
        setPage={setPage}
        component={selectedComponent}
        analysis={activeAnalysis}
        onViewComponent={(file) => {
          setSelectedComponent(file);
          setPage("componentdetails");
        }}
      />
    );
  }

  if (page === "componentdetails") {
    return (
      <ComponentDetails
        setPage={setPage}
        component={selectedComponent}
        repository={activeAnalysis?.repository}
      />
    );
  }
  if (page === "repository-details") {
    return (
      <RepositoryDetails
        setPage={setPage}
        selectedRepo={selectedRepo}
        repoBack={repoBack}
        startAnalysis={startAnalysis}
      />
    );
  }

  if (page === "analysis-results") {
    return (
      <AnalysisResults
        setPage={setPage}
        selectedRepo={selectedRepo}
        removeCompletedRepository={removeCompletedRepository}
        analysis={activeAnalysis}
        startAnalysis={startAnalysis}
      />
    );
  }

  if (page === "profile") {
    return <Profile setPage={setPage} onLogout={handleLogout}/>;
  }

  if (page === "forgot-password") {
    return <ForgotPassword setPage={setPage} setEmailRequest={setEmailRequest} />;
  }

  if (page === "check-email") {
    return <CheckEmail setPage={setPage} emailRequest={emailRequest} />;
  }
}
export default App;
