import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";

function ComponentDetails({ setPage, component, repository, analysis, onViewComponent }) {
  const [activeTab, setActiveTab] = useState("contents"); // save chosen tab: content/dependencies
  const item = component;

  const nodes = analysis?.nodes ?? [];
  const importConnections = (analysis?.connections ?? []).filter(
    (connection) => connection.type === "import"
  );
  const findFile = (id) =>
    nodes.find((node) => node.id === id && node.type === "File");

  const imports = importConnections
    .filter((connection) => connection.from === component?.id)
    .map((connection) => findFile(connection.to))
    .filter(Boolean);

  const usedBy = importConnections
    .filter((connection) => connection.to === component?.id)
    .map((connection) => findFile(connection.from))
    .filter(Boolean);

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
              <li className="list-item" key={name + ":" + startLine}>
                {name}
              </li>
            ))}
          </ul>

          <h2>Classes</h2>

          <ul>
            {(component.classes ?? []).map(({ name, startLine }) => (
              <li className="list-item" key={name + ":" + startLine}>
                {name}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Imports</h2>

          <ul>
            {usedBy.map((file) => (
              <li key={file.id}>
                <button
                  type="button"
                  className="list-item"
                  onClick={() => onViewComponent(file)}
                >
                  {file.path}
                </button>
              </li>
            ))}
          </ul>

          <h2>Used by</h2>
          <ul>
            {usedBy.map((file) => (
              <li key={file.id}>
                <button
                  type="button"
                  className="list-item"
                  onClick={() => onViewComponent(file)}
                >
                  {file.path}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="primary"
            onClick={() => setPage("dependencydetails")}
          >
            View all dependencies
          </button>
        </section>
      )}

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

export default ComponentDetails;
