
import { useState } from 'react'

function InteractiveMap({ setPage }) {
  const [zoom, setZoom] = useState(1)

  return (
    <div>
      <button onClick={() => setPage('complete')}>←</button>
      <h2>repository-name</h2>
      <input placeholder="Search in codebase..." />

      <div style={{ position: 'relative', width: 350, height: 450 }}>

        <svg width="350" height="450">
          <g transform={`translate(175 225) scale(${zoom}) translate(-175 -225)`}>

            <line x1="175" y1="200" x2="100" y2="100" stroke="gray" />
            <line x1="175" y1="200" x2="250" y2="100" stroke="gray" />
            <line x1="175" y1="200" x2="80" y2="300" stroke="gray" />
            <line x1="175" y1="200" x2="260" y2="300" stroke="gray" />
            <line x1="175" y1="200" x2="90" y2="200" stroke="gray" />
            <line x1="175" y1="200" x2="290" y2="200" stroke="gray" />
            <line x1="175" y1="200" x2="175" y2="350" stroke="gray" />

            <line x1="100" y1="100" x2="50" y2="60" stroke="gray" />
            <line x1="100" y1="100" x2="150" y2="50" stroke="gray" />
            <line x1="250" y1="100" x2="300" y2="50" stroke="gray" />
            <line x1="80" y1="300" x2="40" y2="370" stroke="gray" />
            <line x1="260" y1="300" x2="310" y2="370" stroke="gray" />
            <line x1="90" y1="200" x2="80" y2="300" stroke="gray" />
            <line x1="250" y1="100" x2="290" y2="200" stroke="gray" />

            <circle cx="175" cy="200" r="18" fill="gray" />

            <circle cx="100" cy="100" r="12" fill="lightgray" />
            <circle cx="250" cy="100" r="12" fill="lightgray" />
            <circle cx="80" cy="300" r="12" fill="lightgray" />
            <circle cx="260" cy="300" r="12" fill="lightgray" />
            <circle cx="90" cy="200" r="12" fill="lightgray" />
            <circle cx="290" cy="200" r="12" fill="lightgray" />
            <circle cx="175" cy="350" r="12" fill="lightgray" />

            <circle cx="50" cy="60" r="8" fill="gray" />
            <circle cx="150" cy="50" r="8" fill="gray" />
            <circle cx="300" cy="50" r="8" fill="gray" />
            <circle cx="40" cy="370" r="8" fill="gray" />
            <circle cx="310" cy="370" r="8" fill="gray" />

          </g>
        </svg>

        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <button onClick={() => setZoom(zoom + 0.2)}>+</button>
          <button onClick={() => setZoom(Math.max(0.2, zoom - 0.2))}>−</button>
          <button onClick={() => setZoom(1)}>Reset</button>
        </div>

      </div>
    </div>
  )
}

export default InteractiveMap
