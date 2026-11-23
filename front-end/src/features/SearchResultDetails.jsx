import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";

function SearchResultDetails({ result, setPage, repository }) {
  if (!result) {
    return <p>No result selected.</p>;
  }
  const item = result;
  return (
    <div>
      <header className="add-header">
        <BackButton setPage={setPage} to="searchresult" />

        <h1>{result.name}</h1>
      </header>
      <p>{result.type}</p>
      <hr />

      <h2>Repository</h2>
      <p>{result.repo}</p>

      <h2>Defined in</h2>
      <p>{result.path}</p>

      <h2>Last edited</h2>
      <p>{result.lastEdited}</p>

      <h2>Used in</h2>
      <ul>
        {(result.usedBy ?? result.usedIn ?? []).map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>

      <button className="primary" onClick={() => setPage("map-highlight")}>
        Highlight on Map
      </button>

      {repository?.url &&
        repository.defaultBranch &&
        item.path &&
        ["File", "Function", "Class"].includes(item.type) && (
          <a
            className="outline"
            href={`${repository.url}/blob/${encodeURIComponent(repository.defaultBranch)}/${item.path.split("/").map(encodeURIComponent).join("/")}${item.startLine ? `#L${item.startLine}` : ""}`}
          >
            View source on GitHub
          </a>
        )}

      <NavBar setPage={setPage} />
    </div>
  );
}

export default SearchResultDetails;
