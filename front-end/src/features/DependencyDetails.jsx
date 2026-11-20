import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from './NavBar.jsx';
import { sampleDependsOn, sampleUsedBy } from "../data/mockData.js";

function DependencyDetails({ setPage, component }) {
  const [tab, setTab] = useState("depends"); 

  const dependsOn = component?.imports ?? [];
  const usedBy = component?.usedBy ?? [];
  const files = tab === "depends" ? dependsOn : usedBy;

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

      {files.map((path) => (
        <div className="list-item" key={path}>
          <p className="path">{path}</p>
        </div>
      ))}
      <NavBar setPage={setPage}/>
    </div>
  );
}

export default DependencyDetails;
