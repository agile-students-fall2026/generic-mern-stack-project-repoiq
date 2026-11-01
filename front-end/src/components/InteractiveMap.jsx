import { useState } from 'react';
import { nodes, connections, repository } from '../data/mockData';

function InteractiveMap({ setPage }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected, setSelected] = useState(null);
  let details = null;

  if (selected) {
    details = (
      <div style={{ fontSize: 12 }}>
        <h3 style={{ fontSize: 16 }}>{selected.name}</h3>
        <p>{selected.info}</p>
        <p>Connections:</p>

        {connections.map((c, i) => {
          if (c.from === selected.id)
            return <p key={i}>{nodes[c.to - 1].name}</p>;

          if (c.to === selected.id)
            return <p key={i}>{nodes[c.from - 1].name}</p>;

          return null;
        })}
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => setPage('complete')}>←</button>
      <h2>repository-name</h2>
      <input placeholder="Search in codebase..." />
      <div style={{ textAlign: 'left', fontSize: 12 }}>
        <p style={{ color: 'gray' }}>— Imports</p>
        <p style={{ color: 'blue' }}>— Calls</p>
        <p style={{ color: 'orange' }}>— Dependencies</p>
      </div>
      <div style={{ position: 'relative', width: 350, height: 350 }}>
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
            {connections.map((connection, i) => {
              const from = nodes.find((node) => node.id === connection.from);
              const to = nodes.find((node) => node.id === connection.to);
              let color = 'orange';
              if (connection.type === 'import') color = 'gray';
              if (connection.type === 'call') color = 'blue';
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={color}
                />
              );
            })}

            {nodes.map((node) => (
              <g key={node.id} onClick={() => setSelected(node)}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="lightgray"
                  stroke="gray"
                />
                <text x={node.x} y={node.y} textAnchor="middle" fontSize="8">
                  {node.name}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <div
          style={{ position: 'absolute', top: 10, right: 10, display: 'grid' }}
        >
          <button onClick={() => setZoom(zoom + 0.2)}>+</button>
          <button onClick={() => setZoom(Math.max(0.2, zoom - 0.2))}>−</button>
          <button onClick={() => setZoom(1)}>Reset</button>
        </div>
      </div>
      {details}
    </div>
  );
}

export default InteractiveMap;
