import BackButton from './BackButton.jsx';
function Login({ setPage }) {
  return (
    <div className="login">
      <BackButton setPage={setPage} to="welcome" />
      <h1>Log in</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="primary" onClick={() => setPage('home')}>
        Log in
      </button>
      <button>Continue with GitHub</button>
      <br />
      <button onClick={() => setPage('signup')}>Create an account</button>
    </div>
  );
}

export default Login;
