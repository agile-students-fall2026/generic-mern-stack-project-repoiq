import NavBar from "./NavBar.jsx";

function AnalysisProgress({ setPage, url, error, startAnalysis, step }) {
  if (error) {
    return (
      <div className="popup">
        <h2>Analysis Failed</h2>
        <p>{error}</p>

        <button
          className="primary"
          onClick={() => {
            setStep(0);
            setError(false);
          }}
        >
          Retry Analysis
        </button>

        <button className="outline" onClick={() => startAnalysis(url)}>
          Back to Repositories
        </button>
      </div>
    );
  }
  return (
    <div className="analysis">
      <h1>Analysis Progress</h1>
      <progress value={step} max={4} style={{ width: "100%" }} />

      <div className="repository">
        <h3>{url.split("/").pop()}</h3>
        <p>{url}</p>
      </div>

      <div className="steps">
        <div className={step >= 1 ? "step done" : "step"}>
          <span className={step === 0 ? "dot half" : "dot filled"}></span>
          <b>Fetching repository files</b>
          <p>{step === 0 ? "In Progress..." : "Completed"}</p>
        </div>

        <div className={step >= 2 ? "step done" : "step"}>
          <span
            className={
              step < 1 ? "dot" : step === 1 ? "dot half" : "dot filled"
            }
          ></span>
          <b>Parsing source code</b>
          <p>
            {step < 1 ? "Pending" : step === 1 ? "In Progress..." : "Completed"}
          </p>
        </div>

        <div className={step >= 3 ? "step done" : "step"}>
          <span
            className={
              step < 2 ? "dot" : step === 2 ? "dot half" : "dot filled"
            }
          ></span>
          <b>Building dependency graph</b>
          <p>
            {step < 2 ? "Pending" : step === 2 ? "In Progress..." : "Completed"}
          </p>
        </div>

        <div className="step">
          <span
            className={
              step < 3 ? "dot" : step === 3 ? "dot half" : "dot filled"
            }
          ></span>
          <b>Generating interactive map</b>
          <p>
            {step < 3 ? "Pending" : step === 3 ? "In Progress..." : "Completed"}
          </p>
        </div>
      </div>

      <button className="outline" onClick={() => setError(true)}>
        Cancel Analysis
      </button>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default AnalysisProgress;
