import { useState } from "react";
import BackButton from "./BackButton.jsx";
import NavBar from './NavBar.jsx';

function DependencyDetails({ setPage, component }) {
  const [tab, setTab] = useState("depends"); 

  const dependsOn = component?.imports ?? [];
  const usedBy = component?.usedBy ?? [];
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
