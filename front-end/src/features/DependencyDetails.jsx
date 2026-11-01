import { useState } from "react";

function DependencyDetails() {
  const [tab, setTab] = useState("depends"); // remembers what tab selected

  // replace when we have actual data/links
  const sampleDependsOn = [
    { name: "example1.jsx", path: "src/App.jsx" },
    { name: "example2.jsx", path: "src/data/sample.jsx" },
  ];
  const sampleUsedBy = [{ name: "example3.jsx", path: "src/sample2.jsx" }];

  let files = [];

  if (tab === "depends") {
    files = sampleDependsOn;
  } else if (tab === "used") {
    files = sampleUsedBy;
  }

  return (
    <div className="dependencies">
      <h1>Dependencies</h1>

      <button onClick={() => setTab("depends")}>
        Depends on ({sampleDependsOn.length})
      </button>

      <button onClick={() => setTab("used")}>
        Used by ({sampleUsedBy.length})
      </button>

      {files.map((file) => (
        <div className="file" key={file.path}>
          <p>{file.name}</p>
          <p className="path">{file.path}</p>
        </div>
      ))}
    </div>
  );
}

export default DependencyDetails;
