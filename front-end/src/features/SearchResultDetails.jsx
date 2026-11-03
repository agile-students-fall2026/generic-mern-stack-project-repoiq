const sample = {
  name: "func1",
  type: "function",
  path: "src/example",
  usedIn: ["examplepath1", "examplepath2", "examplepath3"],
};
function SearchResultDetails({setPage}) {
  return (
    <div>
      <h1>{sample.name}</h1>
      <p>{sample.type}</p>
      <hr />

      <h2>Defined in</h2>
      <p>{sample.path}</p>

      <h2>Used in</h2>
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
