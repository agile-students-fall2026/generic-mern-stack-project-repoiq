import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import AnalysisProgress from "./components/AnalysisProgress.jsx";
import AnalysisComplete from "./components/AnalysisComplete.jsx";
import InteractiveMap from "./components/InteractiveMap.jsx";
import SearchResults from "./components/SearchResults.jsx";
import SearchResultsDetails from "./components/SearchResultsDetails.jsx";
import ComponentDetails from "./components/ComponentDetails.jsx";
import DependencyDetails from "./components/DependencyDetails.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("map");

  if (page === "progress") {
    return <AnalysisProgress setPage={setPage} />;
  }

  if (page === "complete") {
    return <AnalysisComplete setPage={setPage} />;
  }

  if (page === "map") {
    return <InteractiveMap setPage={setPage} />;
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
