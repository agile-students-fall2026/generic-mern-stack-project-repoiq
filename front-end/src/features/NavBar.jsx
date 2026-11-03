import "./NavBar.css";

function NavBar({ setPage }) {
  return (
    <div>
      <div className="navbar-space"></div>

      <div className="navbar">
        <span onClick={() => setPage("home")}>🏠</span>
        <span onClick={() => setPage("searchresult")}>🔍</span>
        <span onClick={() => setPage("map")}>🔗</span>
      </div>
    </div>
  );
}

export default NavBar;
