import { useState } from 'react';
import AnalysisProgress from './features/AnalysisProgress.jsx';
import AnalysisComplete from './features/AnalysisComplete.jsx';
import InteractiveMap from './features/InteractiveMap.jsx';
import SearchResults from './features/SearchResults.jsx';
import SearchResultsDetails from './features/SearchResultDetails.jsx';
import ComponentDetails from './features/ComponentDetails.jsx';
import DependencyDetails from './features/DependencyDetails.jsx';
import Welcome from './features/welcome.jsx';
import Login from './features/login.jsx';
import Signup from './features/signup.jsx';
import Home from './features/Home.jsx';
import AddRepository from './features/AddRepository.jsx';
import Repositories from './features/Repositories.jsx';
import RepositoryDetails from './features/RepositoryDetails.jsx';
import AnalysisResults from './features/AnalysisResults.jsx';

function App() {
  const [page, setPage] = useState('welcome');
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoSearch, setRepoSearch] = useState('');
  function addRepository(url) {
    setRepositories([...repositories, url]);
  }
  if (page === 'welcome') {
    return <Welcome setPage={setPage} />;
  }

  if (page === 'login') {
    return <Login setPage={setPage} />;
  }
  if (page === 'signup') {
    return <Signup setPage={setPage} />;
  }
  if (page === 'home') {
    return (
      <Home
        setPage={setPage}
        setSelectedRepo={setSelectedRepo}
        search={repoSearch}
        setSearch={setRepoSearch}
      />
    );
  }

  if (page === 'repositories') {
    return (
      <Repositories
        setPage={setPage}
        setSelectedRepo={setSelectedRepo}
        search={repoSearch}
        setSearch={setRepoSearch}
      />
    );
  }

  if (page === 'add-repository') {
    return <AddRepository setPage={setPage} />;
  }
  if (page === 'map') {
    return <InteractiveMap setPage={setPage} />;
  }

  if (page === 'progress') {
    return <AnalysisProgress setPage={setPage} />;
  }

  if (page === 'complete') {
    return <AnalysisComplete setPage={setPage} />;
  }

  if (page === 'searchresult') {
    return (
      <SearchResults setPage={setPage} setSelectedResult={setSelectedResult} />
    );
  }

  if (page === 'searchresultdetails') {
    return <SearchResultsDetails setPage={setPage} result={selectedResult} />;
  }

  if (page === 'dependencydetails') {
    return <DependencyDetails setPage={setPage} />;
  }

  if (page === 'componentdetails') {
    return <ComponentDetails setPage={setPage} />;
  }
  if (page === 'repository-details') {
    return <RepositoryDetails setPage={setPage} selectedRepo={selectedRepo} />;
  }

  if (page === 'analysis-results') {
    return <AnalysisResults setPage={setPage} selectedRepo={selectedRepo} />;
  }
}
export default App;
