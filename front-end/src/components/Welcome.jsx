
function Welcome({ setPage }) {
  return (
    <div className="welcome-page">
      <h1>Welcome to RepoIQ</h1>

      <p>
        Explore your GitHub repositories and understand
        your code structure.
      </p>

      <button onClick={() => setPage('home')}>
        Get Started
      </button>
    </div>
  )
}

export default Welcome
