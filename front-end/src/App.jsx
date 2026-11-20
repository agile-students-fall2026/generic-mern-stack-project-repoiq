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

function App() {
  const [page, setPage] = useState("welcome");
  const [repositories, setRepositories] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [removedRepos, setRemovedRepos] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [analysisUrl, setAnalysisUrl] = useState("");
  const [step, setStep] = useState(0);
  const [analysisError, setAnalysisError] = useState("");

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

      setAnalysis({
        ...data,
        analyzedAt: new Date().toLocaleString(),
      });
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

  if (page === "welcome") {
    return <Welcome setPage={setPage} />;
  }

  if (page === "login") {
    return <Login setPage={setPage} />;
  }
  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }
  if (page === "home") {
    return (
      <Home
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

  if (page === "add-repository") {
    return (
      <AddRepository
        setPage={setPage}
        startAnalysis={startAnalysis}
        onRepositoryAdded={(repo) => {
          setRepositories((previous) => [...previous, repo]);
          setSelectedRepo(repo);
        }}
      />
    );
  }

  if (page === "map") {
    return (
      <InteractiveMap
        setPage={setPage}
        selectedRepo={selectedRepo}
        analysis={analysis}
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
        analysis={analysis}
        removeCompletedRepository={removeCompletedRepository}
      />
    );
  }

  if (page === "searchresult") {
    return (
      <SearchResults setPage={setPage} setSelectedResult={setSelectedResult} />
    );
  }

  if (page === "searchresultdetails") {
    return <SearchResultsDetails setPage={setPage} result={selectedResult} />;
  }

  if (page === "dependencydetails") {
    return <DependencyDetails setPage={setPage} />;
  }

  if (page === "componentdetails") {
    return <ComponentDetails setPage={setPage} />;
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
        removeRepository={removeRepository}
        analysis={analysis}
        startAnalysis={startAnalysis}
      />
    );
  }

  if (page === "profile") {
    return <Profile setPage={setPage} />;
  }

  if (page === "forgot-password") {
    return <ForgotPassword setPage={setPage} />
  }
}
export default App;
