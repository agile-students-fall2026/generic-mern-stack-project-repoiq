
function RepositoryDetails({ setPage }) {
  return (
    <div className="repository-details">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Repository Details</h2>
      <h3>repository-name</h3>
      <div className="repository-info">
        <p>Language: JavaScript</p>
        <p>Last updated: 2 days ago</p>
        <p>Analysis status: Completed</p>
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
