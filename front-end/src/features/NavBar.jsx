import { House, Map as MapIcon, Search } from 'lucide-react';
function NavBar({ setPage }) {
  return (
    <div>
      <div className="navbar-space"></div>

      <div className="navbar">
        <span className="link" onClick={() => setPage('home')}>
          <House size={22} />
        </span>
        <span className="link" onClick={() => setPage('searchresult')}>
          <Search size={22} />
        </span>
        <span className="link" onClick={() => setPage('map')}>
          <MapIcon size={22} />
        </span>
      </div>
    </div>
  );
}

export default NavBar;
