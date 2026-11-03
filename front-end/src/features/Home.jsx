function Home() {
  return (
    <div className="home">
      <h1>RepoIQ</h1>
      <h2>Good morning, User</h2> {/* User's name should be dynamically inserted here */}
      <p>Explore your repositories and discover your codebase.</p>
    
      <input
        type="text"
        placeholder="Search repositories..."
      />

      <h3>Recent Repositories</h3>

      <div className="repository-list">
        <div className="repository">
          <h4>Repository 1</h4>
          <p>GitHub Repository</p>
        </div>

        <div className="repository">
          <h4>Repository 2</h4>
          <p>GitHub Repository</p>
        </div>

        <div className="repository">
          <h4>Repository 3</h4>
          <p>GitHub Repository</p>
        </div>
      </div>    
    </div>
  );
}

export default Home;
