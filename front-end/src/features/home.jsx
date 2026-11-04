import "./home.css";

function Home({ setPage }) {
  return (
    <div className="home">
      <div className="home-top">
        <div className="home-logo"></div>
        <h2>RepoiQ</h2>
        <div className="home-profile"></div>
      </div>

      <h1>Good morning </h1>
      <p>Explore your repositories and discover your codebase.</p>

      <div className="home-search">
        <span>🔍</span>
        <input type="text" placeholder="Search for a repository.." />
      </div>

      <div className="home-row">
        <b>Recent Repositories</b>
        <span>View all</span>
      </div>

      <div className="home-card">
        <div className="home-card-img"></div>
        <div className="home-card-text">
          <b>repository-name</b>
          <p className="home-small">updated 2 days ago ● JavaScript</p>
        </div>
        <span>&gt;</span>
      </div>

      <div className="home-card">
        <div className="home-card-img"></div>
        <div className="home-card-text">
          <b>repository-name</b>
          <p className="home-small">updated 5 days ago ● Python</p>
        </div>
        <span>&gt;</span>
      </div>

      <div className="home-card">
        <div className="home-card-img"></div>
        <div className="home-card-text">
          <b>repository-name</b>
          <p className="home-small">updated 1 week ago ● Python</p>
        </div>
        <span>&gt;</span>
      </div>

      <button className="home-add-btn">+ Add Repository</button>

      <div className="home-nav">
        <span onClick={() => setPage("home")}>🏠</span>
        <span onClick={() => setPage("searchresult")}>🔍</span>
        <span onClick={() => setPage("map")}>🔗</span>
      </div>
    </div>
  );
}

export default Home;
