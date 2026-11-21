import { Check } from "lucide-react";
import BackButton from "./BackButton.jsx";
import NavBar from "./NavBar.jsx";
function AnalysisComplete({ setPage, analysis, removeCompletedRepository }) {
  if (!analysis) return <p>No analysis available.</p>;
  return (
    <div className="complete">
      <header className="add-header">
        <BackButton setPage={setPage} to="repository-details" />
        <h1>
          <Check size={48} />
        </h1>
        <h1>Analysis Complete</h1>
      </header>

      <p className="small">We successfully analysed your repository</p>

      <div className="stats">
        <div>{analysis.repository.files} Files</div>
        <div>{analysis.repository.functions} Functions</div>
        <div>{analysis.repository.classes} Classes</div>
        <div>{analysis.repository.relationships} Relationships</div>
      </div>

      <div className="repository">
        <h3>{analysis.repository.name}</h3>
        <p>{analysis.repository.url}</p>
      </div>

      <button className="primary" onClick={() => setPage("map")}>
        Explore Codebase
      </button>

      <button
        className="outline"
        onClick={() => removeCompletedRepository(analysis.repository.id)}
      >
        Remove Repository
      </button>
      <NavBar setPage={setPage} />
    </div>
  );
}

export default AnalysisComplete;
