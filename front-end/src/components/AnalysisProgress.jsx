
import { useState, useEffect } from 'react'
import './AnalysisProgress.css'

function AnalysisProgress({ setPage }) {
  const [step, setStep] = useState(0)

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

      <div className="repository">
        <h3>repository-name</h3>
        <p>https://github.com/username/repo</p>
      </div>

      <div className="steps">
        <div className="step">
          <span className={step >= 1 ? 'dot filled' : 'dot'}></span>
          <b>Fetching repository files</b>
          <p>{step === 0 ? 'In Progress...' : 'Completed'}</p>
        </div>

        <div className="step">
          <span className={step >= 2 ? 'dot filled' : 'dot'}></span>
          <b>Parsing source code</b>
           <p>{step < 1 ? 'Pending' : step === 1 ? 'In Progress...' : 'Completed'}</p>
        </div>

        <div className="step">
         <span className={step >= 3 ? 'dot filled' : 'dot'}></span>
          <b>Building dependency graph</b>
          <p>{step < 2 ? 'Pending' : step === 2 ? 'In Progress...' : 'Completed'}</p>
        </div>

        <div className="step">
          <span className={step >= 4 ? 'dot filled' : 'dot'}></span>
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