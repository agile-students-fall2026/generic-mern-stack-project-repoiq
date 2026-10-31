
function InteractiveMap({ setPage }) {
  return (
    <div>
      <button onClick={() => setPage('complete')}>←</button>
      <h2>repository-name</h2>
      <input placeholder="Search in codebase..." />
    </div>
  )
}

export default InteractiveMap
