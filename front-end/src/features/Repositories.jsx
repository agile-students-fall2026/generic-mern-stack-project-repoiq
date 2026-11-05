import NavBar from './NavBar.jsx';
import BackButton from './BackButton.jsx';
import { sampleRepositories } from '../data/mockData.js';

function Repositories({
  setPage,
  setSelectedRepo,
  setRepoBack,
  removedRepos = [],
  search,
  setSearch,
}) {
  const repositories = sampleRepositories.filter(
    (repo) =>
      !removedRepos.includes(repo.name) &&
      repo.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="repositories">
      <BackButton setPage={setPage} to="home" />

      <h1>Repositories</h1>
      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {repositories.length === 0 ? (
        <>
          <h3>No Repositories Yet</h3>
          <p className="intro">Add your first repository to get started.</p>
        </>
      ) : (
        <ul>
          {repositories.map((repo) => (
            <li
              key={repo.id}
              className="list-item"
              onClick={() => {
                setSelectedRepo(repo);
                setRepoBack('repositories');
                setPage('repository-details');
              }}
            >
              <p>{repo.name}</p>
              <p className="small">
                updated {repo.updated} · {repo.language}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button className="primary" onClick={() => setPage('add-repository')}>
        + Add Repository
      </button>

      <NavBar setPage={setPage} />
    </div>
  );
}

export default Repositories;
