import "./NavBar.css";

function NavBar({ setPage }) {
  return (
    <div className="navbar">
      <span onClick={() => setPage("home")}>🏠</span>
      <span onClick={() => setPage("searchresult")}>🔍</span>
      <span onClick={() => setPage("map")}>🔗</span>
    </div>
  );
}

export default NavBar;
