import { useState } from 'react';
import { nodes, connections } from '../data/mockData';
import BackButton from './BackButton.jsx';
import NavBar from './NavBar.jsx';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import './InteractiveMap.css';

function InteractiveMap({ setPage, selectedRepo }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  let details = null;

  if (selected) {
    details = (
      <div className="details">
        <h3>{selected.name}</h3>
        <p>{selected.info}</p>
        <p>Connections:</p>

        {connections.map((c, i) => {
          if (c.from === selected.id)
            return <p key={i}>{nodes[c.to - 1].name}</p>;

          if (c.to === selected.id)
            return <p key={i}>{nodes[c.from - 1].name}</p>;

          return null;
        })}
        <button className="outline" type="button" onClick={() => setPage('componentdetails')}>
          View component details
        </button>
      </div>
    );
  }

  return (
    <div className="phone">
      <BackButton
        setPage={setPage}
        to={selectedRepo ? 'repository-details' : 'home'}
      />
      <h2>repository-name</h2>

      <input
        placeholder="Search in codebase..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="legend">
        <p className="import">— Imports</p>
        <p className="call">— Calls</p>
        <p className="dependency">— Dependencies</p>
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
                  r={
                    search &&
                    node.name.toLowerCase().includes(search.toLowerCase())
                      ? 40
                      : 30
                  }
                  fill={
                    search &&
                    node.name.toLowerCase().includes(search.toLowerCase())
                      ? 'gray'
                      : 'lightgray'
                  }
                  stroke="gray"
                />

                <text x={node.x} y={node.y} textAnchor="middle" fontSize="8">
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
