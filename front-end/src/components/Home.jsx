
import { useState } from 'react'
import { repository } from '../data/mockData.js'

function Home({ setPage }) {
  const [search, setSearch] = useState('')
  const repositories = [repository]

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  )

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

        <input
          type="text"
          placeholder="Search repositories"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="repository-list">
          {filteredRepositories.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            filteredRepositories.map(repo => (
              <div className="repository-card" key={repo.url}>
                <h3>{repo.name}</h3>
                <p>{repo.url}</p>
                <p>Files: {repo.files}</p>
                <p>Functions: {repo.functions}</p>
                <p>Classes: {repo.classes}</p>
              </div>
            ))
          )}
        </div>

        <button type="button" disabled>
          Add Repository
        </button>
      </main>
    </div>
  )
}

export default Home
