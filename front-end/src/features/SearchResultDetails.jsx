import "./SearchResultDetails.css";

const sample = {
  name: "func1",
  type: "function",
  path: "src/example",
  usedIn: ["examplepath1", "examplepath2", "examplepath3"],
};
function SearchResultDetails() {
  return (
    <div className="result">
      <h1>{sample.name}</h1>
      <p>{sample.type}</p>
      <hr />

      <h3>Defined in</h3>
      <p>{sample.path}</p>

      <h3>Used in</h3>
      <ul>
        {sample.usedIn.map((path) => (
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
