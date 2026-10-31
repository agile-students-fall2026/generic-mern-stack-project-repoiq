



function AnalysisComplete({ setPage }) {
  return (
    <div>
      <h1>Analysis Complete</h1>
      
      <button onClick={() => setPage('map')}>
        Explore Codebase
      </button>
    </div>
  )
}

export default AnalysisComplete