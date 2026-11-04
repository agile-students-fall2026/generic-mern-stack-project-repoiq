function Welcome({ setPage }) {
  return (
    <div className="welcome">
      <h1>Understand any codebase faster</h1>

      <button className="outline" onClick={() => setPage('signup')}>
        Get Started
      </button>

      <button className="primary" onClick={() => setPage('login')}>
        Log In
      </button>
    </div>
  );
}

export default Welcome;
