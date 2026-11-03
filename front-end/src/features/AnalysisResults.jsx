import "./AnalysisResults.css";
import NavBar from "./NavBar.jsx";

function AnalysisResults({ setPage, selectedRepo }) {
  return (
    <div className="analysis-results">
      <button type="button" onClick={() => setPage("repository-details")}>
        ←
      </button>

      <h2>Repository Analysis Details</h2>

      <div className="analysis-summary">
        <h3>{selectedRepo?.name || "Repository"}</h3>
        <p>https://github.com/username/repo</p>
        <p>Last analyzed: Oct 14, 2026</p>
        <p>Status: {selectedRepo?.status || "Unknown"}</p>
      </div>

      <h3>Statistics</h3>

      <div className="analysis-metrics">
        <div>Files: 342</div>
        <div>Functions: 28</div>
        <div>Classes: 65</div>
        <div>Relationships: 19</div>
      </div>

      <div className="analysis-actions">
        <button type="button" onClick={() => setPage("progress")}>
          Re-Analyze
        </button>
        <button type="button">Remove Repository</button>
      </div>

      <NavBar setPage={setPage} />
    </div>
  );
}

export default AnalysisResults;
