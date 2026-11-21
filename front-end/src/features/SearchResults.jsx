import { useState } from 'react';
import BackButton from './BackButton.jsx';
import NavBar from './NavBar.jsx';

function SearchResults({ setPage, setSelectedResult, analysis }) {
  const [searchText, setSearchText] = useState(''); // store input text
  const [selectedType, setSelectedType] = useState('All'); // store selected category

  // stores res matching search
  const filteredRes = [];

  const repoNodes = analysis?.nodes ?? [];
  const query = searchText.toLowerCase();

  for (const result of repoNodes) {
    const matchesText =
      result.name.toLowerCase().includes(query) || 
      result.path.toLowerCase().includes(query);

    const matchesType = selectedType === 'All' || result.type === selectedType;

    if (matchesText && matchesType) {
      filteredRes.push(result);
    }
  }

  return (
    <div className="search-results">
      <header className="add-header">
        <BackButton setPage={setPage} to="repository-details" />
        <h1>Search</h1>
      </header>

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

      <div className="tabs">
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
            <li key={result.id} className="list-item">
              <button
                onClick={() => {
                  setSelectedResult(result);
                  setPage('searchresultdetails');
                }}
              >
                {result.name}
              </button>
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
