import './Home.css';
import NavBar from "./NavBar.jsx";
import { useState } from "react";

function Home({ setPage }) {
  const [search, setSearch] = useState("");
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.trim()) {
            setPage("searchresult");
          }
        }}
      />

      <div className="recent-header">
        <h3>Recent Repositories</h3>
        <button type="button" onClick={() => setPage("searchresult")}>
          View all
        </button>
      </div>

      <div className="repository-list">
        <div
          className="repository"
          onClick={() => setPage("repository-details")}
        >
          <h4>Repository 1</h4>
          <p>GitHub Repository</p>
        </div>
        <div
          className="repository"
          onClick={() => setPage("repository-details")}
        >
          <h4>Repository 2</h4>
          <p>GitHub Repository</p>
        </div>
        <div
          className="repository"
          onClick={() => setPage("repository-details")}
        >
          <h4>Repository 3</h4>
          <p>GitHub Repository</p>
        </div>
      </div>

      <button
        className="add-repository"
        onClick={() => setPage("add-repository")}
      >
        + Add Repository
      </button>
      
     <NavBar setPage={setPage} />

    </div>
  );
}

export default Home;
