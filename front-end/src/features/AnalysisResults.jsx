function AnalysisResults({ setPage }) {
  return (
    <div className="analysis-results">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Analysis Results</h2>
      <p>Repository analysis overview</p>
    </div>
  );
}

export default AnalysisResults;