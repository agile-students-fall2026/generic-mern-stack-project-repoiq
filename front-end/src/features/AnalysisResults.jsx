function AnalysisResults({ setPage }) {
  return (
    <div className="analysis-results">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Analysis Results</h2>
      <p>Repository analysis overview</p>
      <div className="analysis-summary">
        <h3>Analysis Summary</h3>
        <p>Repository: Repository 1</p>
        <p>Files Analyzed: 42</p>
        <p>Total Lines of Code: 3,250</p>
        <p>Primary Language: JavaScript</p>
      </div>
    </div>
  );
}

export default AnalysisResults;