import { useState } from "react";

function DependencyDetails() {
  const [tab, setTab] = useState("depends");

  const sampleDependsOn = [
    { name: "example1.jsx", path: "src/App.jsx" },
    { name: "example2.jsx", path: "src/data/sample.jsx" },
  ];

  const sampleUsedBy = [{ name: "example3.jsx", path: "src/sample2.jsx" }];

  let files = sampleDependsOn;

  if (tab === "used") {
    files = sampleUsedBy;
  }

  return (
    <div>
      <h1>Dependencies</h1>
      <div>
        <button onClick={() => setTab("depends")}>
          Depends on ({sampleDependsOn.length})
        </button>

        <button onClick={() => setTab("used")}>
          Used by ({sampleUsedBy.length})
        </button>
      </div>

      {files.map((file) => (
        <div key={file.path}>
          <div>
            <p>{file.name}</p>
            <p>{file.path}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DependencyDetails;
