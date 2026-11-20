import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from './NavBar.jsx';
import { sampleDependsOn, sampleUsedBy } from "../data/mockData.js";

function DependencyDetails({ setPage, component }) {
  const [tab, setTab] = useState("depends"); // remembers what tab selected

  let files = [];

  if (tab === "depends") {
    files = sampleDependsOn;
  } else if (tab === "used") {
    files = sampleUsedBy;
  }

  return (
    <div className="dependencies">
      <header className="add-header">
        <BackButton setPage={setPage} to="componentdetails" />
        <h1>Dependencies</h1>
      </header>

      <div className="tabs">
        <button onClick={() => setTab("depends")} disabled={tab === "depends"}>
          Depends on ({sampleDependsOn.length})
        </button>

        <button onClick={() => setTab("used")} disabled={tab === "used"}>
          Used by ({sampleUsedBy.length})
        </button>
      </div>

      {files.map((file) => (
        <div className="list-item" key={file.path}>
          <p>{file.name}</p>
          <p className="path">{file.path}</p>
        </div>
      ))}
      <NavBar setPage={setPage}/>
    </div>
  );
}

export default DependencyDetails;
