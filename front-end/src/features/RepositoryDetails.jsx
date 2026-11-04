import './RepositoryDetails.css';
import BackButton from './BackButton.jsx';

function RepositoryDetails({ setPage, selectedRepo }) {
  return (
    <div className="repository-details">
      <BackButton setPage={setPage} to="repositories" />

      <h2>Repository Details</h2>
      <h3>{selectedRepo?.name || 'No repository selected'}</h3>
      <div className="repository-info">
        <p>Language: {selectedRepo?.language || 'Not specified'}</p>
        <p>Last updated: {selectedRepo?.updated || 'Not specified'}</p>
        <p>Analysis status: {selectedRepo?.status || 'Unknown'}</p>
      </div>
      <div className="repository-actions">
        <button type="button" onClick={() => setPage('map')}>
          View Code Map
        </button>

        <button type="button" onClick={() => setPage('analysis-results')}>
          View Analysis Results
        </button>

        <button type="button" onClick={() => setPage('progress')}>
          Re-Analyse
        </button>
        <button type="button" onClick={() => setPage('searchresult')}>
          Search Repository
        </button>
      </div>
      <p>Repository description goes here.</p>
    </div>
  );
}

export default RepositoryDetails;
