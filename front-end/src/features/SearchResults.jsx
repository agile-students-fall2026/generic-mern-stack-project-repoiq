import { useState } from 'react';

import NavBar from './NavBar.jsx';

// replace later when we have real data
const sampleRes = [
  {
    id: 1,
    name: 'App.jsx',
    path: 'src/App.jsx',
    type: 'File',
  },
  {
    id: 2,
    name: 'searchRepository',
    path: 'src/search.js',
    type: 'Function',
  },
];

function SearchResults({ setPage }) {
  const [searchText, setSearchText] = useState(''); // store input text
  const [selectedType, setSelectedType] = useState('All'); // store selected category

  // create array that stores res matching search
  const filteredRes = [];

  for (const result of sampleRes) {
    const matchesText =
      result.name.includes(searchText) || result.path.includes(searchText);

    const matchesType = selectedType === 'All' || result.type === selectedType;

    if (matchesText && matchesType) {
      filteredRes.push(result);
    }
  }

  return (
    <div className="search-results">
      <h1>Search</h1>

      <div>
        <label htmlFor="search-input">Search text: </label>
        <input
          id="search-input"
          type="search"
          placeholder="Search files and functions"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <button onClick={() => setSearchText('')}>Clear</button>
      </div>

      <div>
        <button
          onClick={() => setSelectedType('All')}
          disabled={selectedType === 'All'}
        >
          All
        </button>

        <button
          onClick={() => setSelectedType('File')}
          disabled={selectedType === 'File'}
        >
          Files
        </button>

        <button
          onClick={() => setSelectedType('Function')}
          disabled={selectedType === 'Function'}
        >
          Functions
        </button>

        <button
          onClick={() => setSelectedType('Class')}
          disabled={selectedType === 'Class'}
        >
          Classes
        </button>
      </div>

      {filteredRes.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredRes.map((result) => (
            <li key={result.id} className="row">
              <p>{result.name}</p>
              <p className="small">{result.path}</p>
            </li>
          ))}
        </ul>
      )}
      <NavBar setPage={setPage} />
    </div>
  );
}

export default SearchResults;
