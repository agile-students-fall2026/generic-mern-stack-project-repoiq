import "./AnalysisResults.css";

function AnalysisResults({ setPage, selectedRepo }) {
  return (
    <div className="analysis-results">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Analysis Results</h2>
      <p>Repository analysis overview</p>
      <div className="analysis-summary">
        <div className="analysis-summary">
        <h3>Analysis Summary</h3>
        <p>Repository: {selectedRepo?.name || "Unknown"}</p>
        <p>Files Analyzed: 42</p>
        <p>Total Lines of Code: 3,250</p>
        <p>Primary Language: {selectedRepo?.language || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;