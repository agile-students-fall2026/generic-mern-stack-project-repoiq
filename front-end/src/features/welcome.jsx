function Welcome({ setPage }) {
  return (
    <div className="welcome">
      <div className="placeholder-img"></div>

      <h1>Understand any codebase faster</h1>

      <div className="placeholder-img"></div>

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
