import './Home.css';
function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <div className="logo-placeholder">Logo</div>
        <h1>RepoIQ</h1>
        <div className="user-placeholder">User</div>
      </div>
      <h2>Good morning, User</h2> {/* User's name should be dynamically inserted here */}
      <p>Explore your repositories and discover your codebase.</p>
    
      <input
        type="text"
        placeholder="Search repositories..."
      />

      <div className="recent-header">
        <h3>Recent Repositories</h3>
        <span>View all</span>
      </div>

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

      <button className="add-repository">  
        + Add Repository
      </button>
      
      <nav className="home-nav">
        <button type="button">Home</button> {/* This button should navigate to the home page */}
        <button type="button">Search</button> {/* This button should navigate to the search page */}
        <button type="button">Code Map</button> {/* This button should navigate to the code map page */}
      </nav>

    </div>
  );
}

export default Home;
