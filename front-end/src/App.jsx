import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import AnalysisProgress from './components/AnalysisProgress.jsx'
import AnalysisComplete from './components/AnalysisComplete.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('complete')

  if (page === 'progress') {
    return <AnalysisProgress setPage={setPage} />
  }

  if (page === 'complete') {
    return <AnalysisComplete setPage={setPage} />
  }

  if (page === 'map') {
    return <InteractiveMap setPage={setPage} />
  }
}
export default App
