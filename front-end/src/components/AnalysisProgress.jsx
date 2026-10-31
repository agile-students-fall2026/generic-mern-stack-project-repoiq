
import { useState, useEffect } from 'react'

function AnalysisProgress({ setPage }) {
  const [step, setStep] = useState(1)

  {/* increase steps every 2 seconds */}
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(step => step + 1)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  {/* when steps finish setpage complete */}
  useEffect(() => {
    if (step >= 4) {
      setPage('complete')
    }
  }, [step, setPage])

  return (
    
    <div>
      <h1>Analysis Progress</h1>

      // repository info at the top
      <div className="repository">
        <h3>repository-name</h3>
        <p>https://github.com/username/repo</p>
      </div>

      <div className="steps">
        <div className="step">
          <b>Fetching repository files</b>
          <p>Completed</p>
        </div>

        <div className="step">
          <b>Parsing source code</b>
          <p>{step === 1 ? 'In Progress...' : 'Completed'}</p>
        </div>

        <div className="step">
          <b>Building dependency graph</b>
          <p>{step < 2 ? 'Pending' : step === 2 ? 'In Progress...' : 'Completed'}</p>
        </div>

        <div className="step">
          <b>Generating interactive map</b>
          <p>{step < 3 ? 'Pending' : step === 3 ? 'In Progress...' : 'Completed'}</p>
        </div>
      </div>


      <button onClick={() => setPage('complete')}>
        Set to Complete
      </button>
    </div>
  )
}

export default AnalysisProgress