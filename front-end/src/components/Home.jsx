
import { repository } from '../data/mockData.js'

function Home({ setPage }) {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>RepoIQ</h1>
        <button onClick={() => setPage('welcome')}>
          Back
        </button>
      </header>

      <main>
        <h2>My Repositories</h2>

        <p>Manage and explore your repositories.</p>

        <div className="repository-list">
          <div className="repository-card">
            <h3>{repository.name}</h3>

            <p>{repository.url}</p>

            <p>Files: {repository.files}</p>

            <p>Functions: {repository.functions}</p>

            <p>Classes: {repository.classes}</p>
          </div>
        </div>

        <button type="button" disabled>
          Add Repository
        </button>
      </main>
    </div>
  )
}

export default Home
