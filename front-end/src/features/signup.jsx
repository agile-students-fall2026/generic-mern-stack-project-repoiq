import "./signup.css";

function Signup({ setPage }) {
  return (
    <div className="signup">
      <button className="signup-back" onClick={() => setPage("welcome")}>
        &lt;
      </button>

      <h1>Create an account</h1>
      <p>Join RepoiQ and start exploring any codebase.</p>

      <div className="signup-input-box">
        <span>👤</span>
        <input type="text" placeholder="Full name" />
      </div>

      <div className="signup-input-box">
        <span>✉️</span>
        <input type="email" placeholder="Email address" />
      </div>

      <div className="signup-input-box">
        <span>🔒</span>
        <input type="password" placeholder="Password" />
        <span>👁️</span>
      </div>
      <p className="signup-hint">At least 8 characters with a number and a letter</p>

      <div className="signup-input-box">
        <span>🔒</span>
        <input type="password" placeholder="Confirm Password" />
        <span>👁️</span>
      </div>

      <button className="signup-btn signup-btn-gray" onClick={() => setPage("home")}>
        Sign Up
      </button>

      <p className="signup-center">——— or continue with ———</p>

      <button className="signup-btn signup-btn-outline" onClick={()=>setPage("github")}>Continue with GitHub</button>

      <p className="signup-center">
        Already have an account?{" "}
        <span onClick={() => setPage("login")}>Log in</span>
      </p>
    </div>
  );
}

export default Signup;
