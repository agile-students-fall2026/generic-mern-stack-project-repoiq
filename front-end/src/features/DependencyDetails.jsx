import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";

function DependencyDetails({ setPage, component, analysis, onViewComponent }) {
  const [tab, setTab] = useState("depends");

  const nodes = analysis?.nodes ?? [];
  const imports = (analysis?.connections ?? []).filter(
    (connection) => connection.type === "import",
  );
  const findFile = (id) =>
    nodes.find((node) => node.id === id && node.type === "File");

  const dependsOn = imports
    .filter((connection) => connection.from === component?.id)
    .map((connection) => findFile(connection.to))
    .filter(Boolean);
  const usedBy = imports
    .filter((connection) => connection.to === component?.id)
    .map((connection) => findFile(connection.from))
    .filter(Boolean);

  const files = tab === "depends" ? dependsOn : usedBy;

  return (
    <div className="dependencies">
      <header className="add-header">
        <BackButton setPage={setPage} to="componentdetails" />
        <h1>Dependencies</h1>
      </header>

      <div className="tabs">
        <button onClick={() => setTab("depends")} disabled={tab === "depends"}>
          Depends on ({dependsOn.length})
        </button>

        <button onClick={() => setTab("used")} disabled={tab === "used"}>
          Used by ({usedBy.length})
        </button>
      </div>

      {files.map((file) => (
        <button
          key={file.id}
          className="list-item"
          type="button"
          onClick={() => onViewComponent(file)}
        >
          {file.path}
        </button>
      ))}
      <NavBar setPage={setPage} />
    </div>
  );
}

export default DependencyDetails;
