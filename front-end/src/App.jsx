import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import AnalysisProgress from "./features/AnalysisProgress.jsx";
import AnalysisComplete from "./features/AnalysisComplete.jsx";
import InteractiveMap from "./features/InteractiveMap.jsx";
import SearchResults from "./features/SearchResults.jsx";
import SearchResultsDetails from "./features/SearchResultsDetails.jsx";
import ComponentDetails from "./features/ComponentDetails.jsx";
import DependencyDetails from "./features/DependencyDetails.jsx";
import Welcome from "./features/Welcome.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("welcome");
  if (page === "welcome") {
    return <Welcome setPage={setPage} />;
  }

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
