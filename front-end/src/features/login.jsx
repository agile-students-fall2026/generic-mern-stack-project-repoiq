import "./login.css";

function Login({ setPage }) {
  return (
    <div className="login">
      <button className="login-back" onClick={() => setPage("welcome")}>
        &lt;
      </button>

      <h1>Welcome back</h1>
      <p>Log in to continue to RepoiQ</p>

      <div className="login-tabs">
        <button className="login-tab">Log In</button>
        <button className="login-tab" onClick={() => setPage("signup")}>
          Sign Up
        </button>
      </div>

      <div className="login-input-box">
        <span>👤</span>
        <input type="email" placeholder="Email address" />
      </div>

      <div className="login-input-box">
        <span>🔒</span>
        <input type="password" placeholder="Password" />
      </div>

      <p className="login-right">Forgot password?</p>

      <button className="login-btn login-btn-gray" onClick={() => setPage("home")}>
        Log In
      </button>

      <p className="login-center">——— or continue with ———</p>

      <button className="login-btn login-btn-outline">continue with Github</button>

      <p className="login-center">
        Don't have an account?{" "}
        <span onClick={() => setPage("signup")}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;
