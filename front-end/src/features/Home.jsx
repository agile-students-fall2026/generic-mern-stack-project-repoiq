import { useState } from 'react';
import NavBar from './NavBar.jsx';
import EmptyState from './EmptyState.jsx';
import { sampleRepositories } from '../data/mockData.js';

function Home({ setPage, setSelectedRepo, search, setSearch }) {
  const [search, setSearch] = useState('');
  return (
    <div className="home">
      <div className="home-header">
        <div className="logo-placeholder"></div>
        <h1>RepoIQ</h1>
        <div className="user-placeholder"></div>
      </div>
      <h2>Good morning, User</h2>{' '}
      {/* User's name should be dynamically inserted here */}
      <p>Explore your repositories and discover your codebase.</p>
      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && search.trim()) {
            setPage('repositories');
          }
        }}
      />
      <div className="recent-header">
        <h3>Recent Repositories</h3>
        <button type="button" onClick={() => setPage('repositories')}>
          View all
        </button>
      </div>
      {sampleRepositories.length === 0 ? (
        <EmptyState setPage={setPage} />
      ) : (
        <div className="repository-list">
          {sampleRepositories.map((repo) => (
            <div
              className="repository"
              key={repo.id}
              onClick={() => {
                setSelectedRepo(repo);
                setPage('repository-details');
              }}
            >
              <div className="repo-placeholder"></div>
              <div>
                <h4>{repo.name}</h4>
                <p className="small">
                  updated {repo.updated} · {repo.language}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="add-repository"
        onClick={() => setPage('add-repository')}
      >
        + Add Repository
      </button>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default Home;
