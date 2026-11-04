import { useState } from 'react';
import NavBar from './NavBar.jsx';
import BackButton from './BackButton.jsx';

function AddRepository({ setPage }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  function handleAnalyze() {
    if (!/^github\.com\/[^/]+\/[^/]+\/?$/.test(url.trim())) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }

    setError('');
    setPage('progress');
  }

  return (
    <div className="add-repository-page">
      <div className="add-header">
        <BackButton setPage={setPage} to="home" />
        <h1>Add Repository</h1>
      </div>

      <div className="placeholder-img"></div>

      <h3>Add a Github Repository</h3>

      <p className="intro">
        Paste the repository URL or link your Github account
      </p>

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

      <button
        className="primary"
        type="button"
        onClick={handleAnalyze}
        disabled={!url.trim()}
      >
        {' '}
        Add Repository
      </button>

      <p className="center">OR</p>
      <button className="outline" type="button">
        Connect to GitHub
      </button>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default AddRepository;
