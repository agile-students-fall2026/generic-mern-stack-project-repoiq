import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";

function SearchResultDetails({ result, setPage }) {
  if (!result) {
    return <p>No result selected.</p>;
  }

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
        {result.usedIn.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>

      {/* link to interactice map later */}
      <button onClick={() => setPage("map")}>Highlight on Map</button>

      {/* link to source later */}
      <button>View source on GitHub</button>

      <NavBar setPage={setPage} />
    </div>
  );
}

export default SearchResultDetails;
