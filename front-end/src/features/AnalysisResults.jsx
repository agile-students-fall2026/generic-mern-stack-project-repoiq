import './AnalysisResults.css';
import NavBar from './NavBar.jsx';
import BackButton from './BackButton.jsx';

function AnalysisResults({ setPage, selectedRepo, removeRepository }) {
  return (
    <div className="analysis-results">
      <div className="analysis-header">
        <BackButton setPage={setPage} to="repository-details" />
        <h2>Repository Analysis Details</h2>
      </div>

      <div className="analysis-summary">
        <div className="analysis-repo-header">
          <div className="analysis-repo-icon"></div>
          <div>
            <h3>{selectedRepo?.name || 'Repository'}</h3>
            <p>https://github.com/username/repo</p>
          </div>
        </div>

        <hr />

        <div className="analysis-info-row">
          <span>Last analyzed</span>
          <span>Oct 14, 2026 · 9:31 pm</span>
        </div>

        <div className="analysis-info-row">
          <span>Status</span>
          <span>{selectedRepo?.status || 'Unknown'}</span>
        </div>
      </div>

      <h3>Statistics</h3>

      <div className="analysis-metrics">
        <div>
          <span>Files</span>
          <strong>342</strong>
        </div>
        <div>
          <span>Functions</span>
          <strong>28</strong>
        </div>
        <div>
          <span>Classes</span>
          <strong>65</strong>
        </div>
        <div>
          <span>Relationships</span>
          <strong>19</strong>
        </div>
      </div>

      <div className="analysis-actions">
        <button className="primary" type="button" onClick={() => setPage('progress')}>
          Re-Analyze
        </button>
        <button
        className="outline"
        type="button"
        onClick={() => {
          if (selectedRepo && window.confirm("Are you sure you want to remove this repository?")) {
            removeRepository(selectedRepo.name);
            setPage("home");
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
