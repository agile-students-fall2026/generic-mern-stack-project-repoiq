import "./EmptyState.css";

function EmptyState({ setPage }) {
  return (
    <div className="empty-state">
      <h2>No Repositories Yet</h2>
      <p>Add your first repository to get started.</p>
      <button onClick={() => setPage("add-repository")}>
        Add Repository
      </button>
    </div>
  );
}

export default EmptyState;