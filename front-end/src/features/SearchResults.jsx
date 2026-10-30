import { useState } from "react";

const sampleRes = [
  {
    id: 1,
    name: "App.jsx",
    path: "src/App.jsx",
    type: "File",
  },
  {
    id: 2,
    name: "searchRepository",
    path: "src/search.js",
    type: "Function",
  },
];

function SearchResults() {
  const [searchText, setSearchText] = useState(""); // store input text
  const [selectedType, setSelectedType] = useState("All"); // store selected category

  // create array that stores res matching search
  const filteredRes = sampleRes.filter((result) => {
    const matchesText =
      result.name.includes(searchText) || result.path.includes(searchText);

    const matchesType = selectedType === "All" || result.type === selectedType;

    return matchesText && matchesType;
  });

  return (
    <main>
      <h1>Search</h1>

      <div>
        <label htmlFor="search-input">Search text: </label>
        <input
          id="search-input"
          type="search"
          placeholder="Search files, functions, or classes"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <button type="button" onClick={() => setSearchText("")}>
          Clear
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setSelectedType("All")}
          disabled={selectedType === "All"}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setSelectedType("File")}
          disabled={selectedType === "File"}
        >
          Files
        </button>

        <button
          type="button"
          onClick={() => setSelectedType("Function")}
          disabled={selectedType === "Function"}
        >
          Functions
        </button>

        <button
          type="button"
          onClick={() => setSelectedType("Class")}
          disabled={selectedType === "Class"}
        >
          Classes
        </button>
      </div>

      <h2>Results</h2>

      {filteredRes.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredRes.map((result) => (
            <li key={result.id}>
              <h3>{result.name}</h3>
              <p>{result.path}</p>
              <p>Type: {result.type}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default SearchResults;
