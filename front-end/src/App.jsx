import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import AnalysisProgress from "./features/AnalysisProgress.jsx";
import AnalysisComplete from "./features/AnalysisComplete.jsx";
import InteractiveMap from "./features/InteractiveMap.jsx";
import SearchResults from "./features/SearchResults.jsx";
import SearchResultsDetails from "./features/SearchResultDetails.jsx";
import ComponentDetails from "./features/ComponentDetails.jsx";
import DependencyDetails from "./features/DependencyDetails.jsx";
import Welcome from "./features/welcome.jsx";
import Login from "./features/login.jsx";
import Signup from "./features/signup.jsx";
import Home from "./features/Home.jsx";
import AddRepository from "./features/AddRepository.jsx";
import RepositoryDetails from "./features/RepositoryDetails.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("Welcome");
  const [selectedRepo, setSelectedRepo] = useState(null);
  if (page === "Welcome") {
    return <Welcome setPage={setPage} />;
  }

  if (page === "login") {
    return <Login setPage={setPage} />;
  }

  if (page === "signup") {
    return <Signup setPage={setPage} />;
  }

  if (page === "home") {
    return <Home setPage={setPage} setSelectedRepo={setSelectedRepo} />;
  }

  if (page === "add-repository") {
    return <AddRepository setPage={setPage} />;
  }

  if (page === "repository-details") {
    return <RepositoryDetails setPage={setPage} selectedRepo={selectedRepo} />;
  }

  if (page === "map") {
    return <InteractiveMap setPage={setPage} />;
  }

  if (page === "progress") {
    return <AnalysisProgress setPage={setPage} />;
  }

  if (page === "complete") {
    return <AnalysisComplete setPage={setPage} />;
  }

  if (page === "searchresult") {
    return <SearchResults setPage={setPage} />;
  }

  if (page === "searchresultdetails") {
    return <SearchResultsDetails setPage={setPage} />;
  }

  if (page === "dependencydetails") {
    return <DependencyDetails setPage={setPage} />;
  }

  if (page === "componentdetails") {
    return <ComponentDetails setPage={setPage} />;
  }
}
export default App;
