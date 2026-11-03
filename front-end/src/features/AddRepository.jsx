
function AddRepository({ setPage }) {
  return (
    <div className="add-repository-page">
      <h2>Add a Github Repository</h2>
      <p>Paste the repository URL or link your Github account</p>

      <input
        type="text"
        placeholder="https://github.com/username/repo"
      />

      <button type="button" onClick={() => setPage("progress")}>
        Analyse Repository
      </button>

      <p>OR</p>

      <button type="button">
        Connect to GitHub
      </button>
    </div>
  );
}

export default AddRepository;

