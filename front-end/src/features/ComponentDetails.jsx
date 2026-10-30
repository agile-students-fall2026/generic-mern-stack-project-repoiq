import { useState } from "react";

const sample = {
  name: "example.js",
  path: "src/example.js",
  functions: ["func1", "func2"],
  classes: ["class1", "class2"],
  imports: ["src/helper.js"],
  usedBy: ["src/App.jsx"],
};

function ComponentDetails() {
  const [activeTab, setActiveTab] = useState("contents"); // save chosen tab: content/dependencies

  return (
    <main>
      <h1>Component Details</h1>

      <h2>{sample.name}</h2>
      <p>{sample.path}</p>

      <div>
        <button
          type="button"
          onClick={() => setActiveTab("contents")}
          disabled={activeTab === "contents"}
        >
          Contents
        </button>

        <button
          type="button"
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
            {sample.functions.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>

          <h2>Classes</h2>

          <ul>
            {sample.classes.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Imports</h2>

          <ul>
            {sample.imports.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>

          <h2>Used by</h2>
          <ul>
            {sample.usedBy.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>

          <button type="button" disabled>
            View all dependencies
          </button>
        </section>
      )}

      <button type="button" disabled>
        View source on GitHub
      </button>
    </main>
  );
}

export default ComponentDetails;
