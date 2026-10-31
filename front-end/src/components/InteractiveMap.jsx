

function InteractiveMap({ setPage }) {
  return (
    <div>
      <h2>repository-name</h2>
      <input placeholder="Search in codebase..." />

      <svg width="350" height="450">
        <circle cx="175" cy="200" r="18" fill="gray" />
        <circle cx="100" cy="100" r="12" fill="lightgray" />
        <circle cx="250" cy="100" r="12" fill="lightgray" />
        <circle cx="80" cy="300" r="12" fill="lightgray" />
        <circle cx="260" cy="300" r="12" fill="lightgray" />
      </svg>
    </div>
  )
}

export default InteractiveMap
