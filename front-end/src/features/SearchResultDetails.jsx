import { searchResDetailsSample } from "../data/mockData.js";
function SearchResultDetails({ setPage }) {
  return (
    <div>
      <h1>{searchResDetailsSample.name}</h1>
      <p>{searchResDetailsSample.type}</p>
      <hr />

      <h2>Defined in</h2>
      <p>{searchResDetailsSample.path}</p>

      <h2>Used in</h2>
      <ul>
        {searchResDetailsSample.usedIn.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>

      {/* link to interactice map later */}
      <button>Highlight on Map</button>

      {/* link to source later */}
      <button>View source on GitHub</button>
    </div>
  );
}

export default SearchResultDetails;
