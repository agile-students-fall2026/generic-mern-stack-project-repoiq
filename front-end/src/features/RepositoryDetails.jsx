
function RepositoryDetails({ setPage }) {
  return (
    <div className="repository-details">
      <button type="button" onClick={() => setPage("home")}>
        ←
      </button>

      <h2>Repository Details</h2>
      <h3>repository-name</h3>
      <p>Repository description goes here.</p>
    </div>
  );
}

export default RepositoryDetails;
