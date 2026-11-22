import "./AnalysisResults.css";
import NavBar from "./NavBar.jsx";
import BackButton from "./BackButton.jsx";
import { CodeXml } from "lucide-react";

function AnalysisResults({
  setPage,
  selectedRepo,
  removeCompletedRepository,
  analysis,
  startAnalysis,
}) {
  if (!analysis) {
    return (
      <div className="analysis-results">
        <header className="add-header">
          <BackButton setPage={setPage} to="repository-details" />
          <h1>Repository Analysis Details</h1>
        </header>
        <p>Analyze this repository first.</p>
        <NavBar setPage={setPage} />
      </div>
    );
  }
  const { repository, analyzedAt } = analysis;

  return (
    <div className="analysis-results">
      <header className="add-header">
        <BackButton setPage={setPage} to="repository-details" />
        <h1>Repository Analysis Details</h1>
      </header>

      <div className="analysis-summary">
        <div className="analysis-repo-header">
          <CodeXml size={32} strokeWidth={2.5} className="analysis-repo-icon" />
          <div>
            <h3>{repository.name || "Repository"}</h3>
            <p>{repository.url}</p>
          </div>
        </div>

        <hr />

        <div className="analysis-info-row">
          <span>Last analyzed</span>
          <span>{new Date(analyzedAt).toLocaleString()}</span>
        </div>

        <div className="analysis-info-row">
          <span>Status</span>
          <span>{selectedRepo?.status || "Unknown"}</span>
        </div>
      </div>

      <h3>Statistics</h3>

      <div className="analysis-metrics">
        <div>
          <span>Files</span>
          <strong>{repository.files}</strong>
        </div>
        <div>
          <span>Functions</span>
          <strong>{repository.functions}</strong>
        </div>
        <div>
          <span>Classes</span>
          <strong>{repository.classes}</strong>
        </div>
        <div>
          <span>Relationships</span>
          <strong>{repository.relationships}</strong>
        </div>
      </div>

      <div className="analysis-actions">
        <button
          className="primary"
          type="button"
          onClick={() => startAnalysis(analysis.repository.url)}
        >
          Re-Analyze
        </button>
        <button
          className="outline"
          type="button"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to remove this repository?")
            ) {
              removeCompletedRepository(repository.id);
            }
          }}
        >
          Remove Repository
        </button>
      </div>

      <NavBar setPage={setPage} />
    </div>
  );
}

export default AnalysisResults;
