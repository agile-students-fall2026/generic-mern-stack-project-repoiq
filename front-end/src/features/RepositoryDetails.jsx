import './RepositoryDetails.css';
import BackButton from './BackButton.jsx';
import NavBar from './NavBar.jsx';

function RepositoryDetails({ setPage, selectedRepo, repoBack }) {
  return (
    <div className="repository-details">
      <header className="add-header">
        <BackButton setPage={setPage} to={repoBack} />
        <h1>Repository Details</h1>
      </header>
      <h3>{selectedRepo?.name || 'No repository selected'}</h3>
      <div className="list-item">
        <p>Language: {selectedRepo?.language || 'Not specified'}</p>
        <p>Last updated: {selectedRepo?.updated || 'Not specified'}</p>
        <p>Analysis status: {selectedRepo?.status || 'Unknown'}</p>
      </div>
      <div>
        <button className="outline" type="button" onClick={() => setPage('map')}>
          View Code Map
        </button>

        <button className="outline" type="button" onClick={() => setPage('analysis-results')}>
          View Analysis Results
        </button>

        <button className="outline" type="button" onClick={() => setPage('progress')}>
          Re-Analyse
        </button>
        <button className="outline" type="button" onClick={() => setPage('searchresult')}>
          Search Repository
        </button>
      </div>
      <p>Repository description goes here.</p>
      <NavBar setPage={setPage}/>
    </div>
  );
}

export default RepositoryDetails;
