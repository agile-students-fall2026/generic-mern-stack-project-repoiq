function NavBar({ setPage }) {
  return (
    <div>
      <div className="navbar-space"></div>

      <div className="navbar">
        <span className="link" onClick={() => setPage('home')}>
          🏠
        </span>
        <span className="link" onClick={() => setPage('searchresult')}>
          🔍
        </span>
        <span className="link" onClick={() => setPage('map')}>
          🔗
        </span>
      </div>
    </div>
  );
}

export default NavBar;
