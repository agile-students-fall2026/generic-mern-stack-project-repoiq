import './AnalysisResults.css';
import NavBar from './NavBar.jsx';
import BackButton from './BackButton.jsx';
import { CodeXml } from 'lucide-react';

function AnalysisResults({ setPage, selectedRepo, removeRepository }) {
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
