import "./AddRepository.css";

function AddRepository({ setPage }) {
  return (
    <div className="add-repository-page">
      <div className="add-header">
        <button type="button" onClick={() => setPage("home")}>
            ←
      </button>
        <h2>Add Repository</h2>
      </div>

      <div className="add-image"></div>

      <h3>Add a Github Repository</h3>
      
      <p>Paste the repository URL or link your Github account</p>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
      />

      <button type="button" onClick={() => setPage("progress")}>
        Analyse Repository
      </button>

      <div className="add-divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <button type="button">
        Connect to GitHub
      </button>
    </div>
  );
}

export default AddRepository;

