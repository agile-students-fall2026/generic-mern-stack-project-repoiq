


function AnalysisProgress({ setPage }) {
  return (
    <div>
      <h1>Analysis Progress</h1>
      <button onClick={() => setPage('complete')}>
        Next
      </button>
    </div>
  )
}

export default AnalysisProgress