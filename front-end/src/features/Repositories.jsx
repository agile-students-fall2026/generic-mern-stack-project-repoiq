import NavBar from './NavBar.jsx';

function Repositories({ repositories, setPage }) {
  return (
    <div className="repositories">
      <BackButton setPage={setPage} to="home" />

      <h1>Repositories</h1>

      {repositories.length === 0 ? (
        <>
          <h3>No Repositories Yet</h3>
          <p className="intro">Add your first repository to get started.</p>
        </>
      ) : (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.url} className="row">
              <p>{repo.name}</p>
              <p className="small">{repo.url}</p>
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
