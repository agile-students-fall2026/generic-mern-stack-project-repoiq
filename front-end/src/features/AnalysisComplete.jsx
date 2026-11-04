function AnalysisComplete({ setPage }) {
  return (
    <div className="complete">
      <h1>✓</h1>
      <h1>Analysis Complete</h1>
      <p>We successfully analysed your repository</p>

      <div className="stats">
        <div>342 Files</div>
        <div>28 Functions</div>
        <div>65 Classes</div>
        <div>19 Relationships</div>
      </div>

      <div className="repository">
        <h3>repository-name</h3>
        <p>https://github.com/username/repo</p>
      </div>

      <button onClick={() => setPage('map')}>Explore Codebase</button>

      <button onClick={() => setPage('progress')}>Remove Repository</button>
    </div>
  );
}

export default AnalysisComplete;
