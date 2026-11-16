import NavBar from "./NavBar.jsx";
import EmptyState from "./EmptyState.jsx";
import repoLogo from "../assets/repo-logo.png";
import userIcon from "../assets/user-icon.png";
import { CodeXml } from "lucide-react";
import { profile } from "../data/mockData";
import { User } from "lucide-react";

function Home({
  setPage,
  setSelectedRepo,
  setRepoBack,
  removedRepos = [],
  search,
  setSearch,
  repositories = [],
}) {
  const visibleRepositories = repositories.filter(
    (repo) => !removedRepos.includes(repo.name),
  );
  return (
    <div className="home">
      <div className="home-header">
        <img src={repoLogo} className="home-logo" />
        <h1>RepoIQ</h1>
        <span className="link home-user" onClick={() => setPage("profile")}>
          <User size={22} />
        </span>
      </div>
      <h2>Good morning, {profile.name}</h2>{" "}
      <p>Explore your repositories and discover your codebase.</p>
      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search.trim()) {
            setPage("repositories");
          }
        }}
      />
      <div className="recent-header">
        <h3>Recent Repositories</h3>
        <button type="button" onClick={() => setPage("repositories")}>
          View all
        </button>
      </div>
      {visibleRepositories.length === 0 ? (
        <EmptyState setPage={setPage} />
      ) : (
        <div className="repository-list">
          {visibleRepositories.map((repo) => (
            <div
              className="repository list-item"
              key={repo.id}
              onClick={() => {
                setSelectedRepo(repo);
                setRepoBack("home");
                setPage("repository-details");
              }}
            >
              <CodeXml size={28} className="repo-icon" />
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
        onClick={() => setPage("add-repository")}
      >
        + Add Repository
      </button>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default Home;
