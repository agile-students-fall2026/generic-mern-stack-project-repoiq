import "./welcome.css";
import logo from "../assets/logo.png";
import visualiser from "../assets/visualiser.png";

function Welcome({ setPage }) {
  return (
    <div className="welcome">
      <img src={logo} className="welcome-logo" />

      <h1>Understand any codebase faster</h1>

      <img src={visualiser} className="welcome-visualiser" />

      <button className="btn btn-outline" onClick={() => setPage("signup")}>
        Get Started
      </button>

      <button className="btn btn-gray" onClick={() => setPage("login")}>
        Log In
      </button>
    </div>
  );
}

export default Welcome;
