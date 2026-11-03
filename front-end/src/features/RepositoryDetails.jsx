import "./RepositoryDetails.css";

function RepositoryDetails({ setPage, selectedRepo }) {
  return (
    <div className="repository-details">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Repository Details</h2>
      <h3>{selectedRepo?.name || "No repository selected"}</h3>
      <div className="repository-info">
        <p>Language: {selectedRepo?.language || "Not specified"}</p>
        <p>Last updated: {selectedRepo?.updated || "Not specified"}</p>
        <p>Analysis status: {selectedRepo?.status || "Unknown"}</p>
      </div>
      <div className="repository-actions">
        <button type="button" onClick={() => setPage("map")}>
            View Code Map
        </button>

        <button type="button" onClick={() => setPage("progress")}>
            Re-Analyse
        </button>
      </div>
      <p>Repository description goes here.</p>
    </div>
  );
}

export default RepositoryDetails;
