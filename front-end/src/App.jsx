import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

// Import components - changes needed
// import AnalysisProgress from './components/AnalysisProgress.jsx'
// import AnalysisComplete from './components/AnalysisComplete.jsx'

import InteractiveMap from './components/InteractiveMap.jsx'
import Welcome from './components/Welcome.jsx'
import Home from './components/Home.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('welcome')
  
  if (page === 'welcome') {
    return <Welcome setPage={setPage} />
  }

  if (page === 'home') {
    return <Home setPage={setPage} />
  }

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
