import "./RepositoryDetails.css";
import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";
import { useState, useEffect } from "react";

function RepositoryDetails({ setPage, selectedRepo, repoBack, startAnalysis }) {
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    if (!selectedRepo?.id) return;

    fetch(`/api/repositories/${selectedRepo.id}`)
      .then((res) => res.json())
      .then((data) => setRepo(data))
      .catch((err) => console.error(err));
  }, [selectedRepo?.id]);

  return (
    <div className="repository-details">
      <header className="add-header">
        <BackButton setPage={setPage} to={repoBack} />
        <h1>Repository Details</h1>
      </header>
      <h3>{repo?.name || selectedRepo?.name || "No repository selected"}</h3>
      <div className="list-item">
        <p>
          Language:{" "}
          {repo?.language || selectedRepo?.language || "Not specified"}
        </p>
        <p>
          Last updated:{" "}
          {repo?.updated || selectedRepo?.updated || "Not specified"}
        </p>
        <p>
          Analysis status: {repo?.status || selectedRepo?.status || "Unknown"}
        </p>
      </div>
      <div>
        <button
          className="outline"
          type="button"
          onClick={() => setPage("map")}
        >
          View Code Map
        </button>

        <button
          className="outline"
          type="button"
          onClick={() => setPage("analysis-results")}
        >
          View Analysis Results
        </button>

        <button
          className="outline"
          type="button"
          onClick={() => {
            if (selectedRepo?.url) {
              startAnalysis(selectedRepo.url);
            } else {
              setPage("add-repository");
            }
          }}
        >
          Re-Analyse
        </button>
        <button
          className="outline"
          type="button"
          onClick={() => setPage("searchresult")}
        >
          Search Repository
        </button>
      </div>
      <p>Repository description goes here.</p>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default RepositoryDetails;
