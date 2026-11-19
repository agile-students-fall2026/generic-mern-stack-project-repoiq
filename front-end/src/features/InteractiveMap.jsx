import { useState } from "react";
import {
  nodes,
  connections,
  repository,
  sampleRepositories,
} from "../data/mockData";
import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";
import { Minus, Plus, RotateCcw } from "lucide-react";
import "./InteractiveMap.css";

function InteractiveMap({ setPage, selectedRepo, analysis }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedRepository, setSelectedRepository] = useState(repository.name);
  let repoNodes = nodes.filter((node) => node.repo === selectedRepository);
  let repoConnections = connections.filter(
    (connection) =>
      repoNodes.find((node) => node.id === connection.from) &&
      repoNodes.find((node) => node.id === connection.to),
  );
  if (analysis) {
    repoNodes = analysis.nodes.map((node, i) => {
      const angle = (i / analysis.nodes.length) * Math.PI * 2;
      const radius = node.type === "Repository" ? 0 : 120;

      return {
        ...node,
        x: 175 + Math.cos(angle) * radius,
        y: 225 + Math.sin(angle) * radius,
      };
    });

    repoConnections = analysis.connections;
  }
  function handleRepositoryChange(e) {
    setSelectedRepository(e.target.value);
    setSelected(null);
    setSearch("");
  }
  let details = null;

  if (selected) {
    details = (
      <div className="details">
        <h3>{selected.name}</h3>
        <p>Type: {selected.type}</p>
        <p>File: {selected.path}</p>
        <p>Used by: {(selected.usedBy || []).join(", ") || "None"}</p>
        {selected.startLine && <p>Line: {selected.startLine}</p>}
        {selected.code && <pre>{selected.code}</pre>}
      </div>
    );
  }

  return (
    <div className="phone">
      <header className="add-header">
        <BackButton
          setPage={setPage}
          to={selectedRepo ? "repository-details" : "home"}
        />
        <h1>{analysis ? analysis.repository.name : selectedRepository}</h1>
      </header>
      {!analysis && (
        <select value={selectedRepository} onChange={handleRepositoryChange}>
          <option value={repository.name}>{repository.name}</option>
          {sampleRepositories.map((repo) => (
            <option key={repo.id} value={repo.name}>
              {repo.name}
            </option>
          ))}
        </select>
      )}
      <input
        placeholder="Search in codebase..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="legend">
        <p className="import">– Imports</p>
        {analysis ? (
          <p className="dependency">– Contains</p>
        ) : (
          <div>
            <p className="call">– Calls</p>
            <p className="dependency">– Dependencies</p>
          </div>
        )}
      </div>

      <div className="map">
        <svg
          width="350"
          height="450"
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              setX((x) => x + e.movementX);
              setY((y) => y + e.movementY);
            }
          }}
        >
          <g
            transform={`translate(${x} ${y}) translate(175 225) scale(${zoom}) translate(-175 -225)`}
          >
            {repoConnections.map((connection, i) => {
              const from = repoNodes.find(
                (node) => node.id === connection.from,
              );
              const to = repoNodes.find((node) => node.id === connection.to);

              let color = "#d6a66a";
              if (connection.type === "import") color = "#aab1c2";
              if (connection.type === "call") color = "#7188d6";

              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={color}
                  strokeWidth="1.5"
                />
              );
            })}

            {repoNodes.map((node) => (
              <g key={node.id} onClick={() => setSelected(node)}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={
                    search &&
                    node.name.toLowerCase().includes(search.toLowerCase())
                      ? 40
                      : 30
                  }
                  fill={
                    search &&
                    node.name.toLowerCase().includes(search.toLowerCase())
                      ? "#d8d6d6"
                      : "#ffffff"
                  }
                  stroke={
                    search &&
                    node.name.toLowerCase().includes(search.toLowerCase())
                      ? "#828282"
                      : "#cbd1df"
                  }
                  strokeWidth="1.5"
                />

                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  fontSize="8 "
                  fill="#343947"
                  fontWeight="500"
                >
                  {node.name}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <div className="controls">
          <button onClick={() => setZoom(zoom + 0.2)}>
            <Plus size={18} />
          </button>
          <button onClick={() => setZoom(Math.max(0.2, zoom - 0.2))}>
            <Minus size={18} />
          </button>
          <button onClick={() => setZoom(1)}>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {details}
      <NavBar setPage={setPage} />
    </div>
  );
}

export default InteractiveMap;
