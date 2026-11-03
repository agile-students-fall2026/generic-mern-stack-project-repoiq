function AddRepository() {
  return (
    <div className="add-repository-page">
      <h2>Add Repository</h2>
      <p>Enter a GitHub repository URL to analyze.</p>
      <input
        type="text"
        placeholder="https://github.com/username/repository"
      />
    </div>
  );
}

export default AddRepository;
