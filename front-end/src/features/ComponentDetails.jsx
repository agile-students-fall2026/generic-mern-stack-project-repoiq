import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from './NavBar.jsx';
import { componentDetailSample } from "../data/mockData.js";

function ComponentDetails({ setPage, componentId }) {
  const [activeTab, setActiveTab] = useState("contents"); // save chosen tab: content/dependencies
  const [component, setComponent] = useState(null);
  const [error, setError] = useState('');

  

  return (
    <div className="component-details">
      <header className="add-header">
        <BackButton setPage={setPage} to="map" />
        <h1>Component Details</h1>
      </header>

      <div className="list-item">
        <h2>{componentDetailSample.name}</h2>
        <p>{componentDetailSample.path}</p>
      </div>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("contents")}
          disabled={activeTab === "contents"}
        >
          Contents
        </button>

        <button
          onClick={() => setActiveTab("dependencies")}
          disabled={activeTab === "dependencies"}
        >
          Dependencies
        </button>
      </div>

      {activeTab === "contents" ? (
        <section>
          <h2>Functions</h2>
          <ul>
            {componentDetailSample.functions.map((name) => (
              <li className="list-item" key={name}>{name}</li>
            ))}
          </ul>

          <h2>Classes</h2>

          <ul>
            {componentDetailSample.classes.map((name) => (
              <li className="list-item" key={name}>{name}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Imports</h2>

          <ul>
            {componentDetailSample.imports.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>

          <h2>Used by</h2>
          <ul>
            {componentDetailSample.usedBy.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>

          <button className="primary" onClick={() => setPage('dependencydetails')}>View all dependencies</button>
        </section>
      )}

      {/*add later*/}
      <button className="outline" type="button">View source on GitHub</button>

      <NavBar setPage={setPage}/>
    </div>
  );
}

export default ComponentDetails;
