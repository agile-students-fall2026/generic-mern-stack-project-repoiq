import { useState } from 'react';
import NavBar from './NavBar.jsx';

function AddRepository({ setPage }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  function handleAnalyze() {
    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(url.trim())) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }

    setError('');
    setPage('progress');
  }

  return (
    <div className="add-repository-page">
      <div className="add-header">
        <button type="button" onClick={() => setPage('home')}>
          ←
        </button>
        <h2>Add Repository</h2>
      </div>

      <div className="add-image"></div>

      <h3>Add a Github Repository</h3>

      <p>Paste the repository URL or link your Github account</p>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError('');
        }}
      />

      {error && <p className="add-error">{error}</p>}

      <button type="button" onClick={handleAnalyze} disabled={!url.trim()}>
        Analyse Repository
      </button>

      <div className="add-divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <NavBar setPage={setPage} />
      <button type="button">Connect to GitHub</button>
    </div>
  );
}

export default AddRepository;
