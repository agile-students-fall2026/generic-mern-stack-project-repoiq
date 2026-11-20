import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from './NavBar.jsx';

function ComponentDetails({ setPage, component }) {
  const [activeTab, setActiveTab] = useState("contents"); // save chosen tab: content/dependencies

  return (
    <div className="component-details">
      <header className="add-header">
        <BackButton setPage={setPage} to="map" />
        <h1>Component Details</h1>
      </header>

      <div className="list-item">
        <h2>{component.name}</h2>
        <p>{component.path}</p>
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
            {(component.functions ?? []).map(({ name, startLine }) => (
              <li className="list-item" key={name + ":" + startLine}>{name}</li>
            ))}
          </ul>

          <h2>Classes</h2>

          <ul>
            {(component.classes ?? []).map(({ name, startLine }) => (
              <li className="list-item" key={name + ":" + startLine}>{name}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Imports</h2>

          <ul>
            {(component.imports ?? []).map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>

          <h2>Used by</h2>
          <ul>
            {(component.usedBy ?? component.usedIn ?? []).map((path) => (
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
