


function AnalysisProgress({ setPage }) {
  const [step, setStep] = useState(1)
  return (
    
    <div>
      <h1>Analysis Progress</h1>

      // repository info at the top
      <div className="repository">
        <h3>repository-name</h3>
        <p>https://github.com/username/repo</p>
      </div>


      <button onClick={() => setPage('complete')}>
        Next
      </button>
    </div>
  )
}

export default AnalysisProgress