import { useState } from 'react';
import BackButton from './BackButton.jsx';

function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await response.json();

  if (data.success) {
    setPage('home');
  } else {
    setError(data.message);
  }
}

return (
  <div className="login">
    <header className="add-header">
      <BackButton setPage={setPage} to="welcome" />
      <h1>Log in</h1>
    </header>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

    <button type="button" className="forgot-password" onClick={() => setPage('forgot-password')}>
      Forgot Password?
    </button>
    {error && <p className="add-error">{error}</p>}
    <button className="primary" onClick={handleLogin}>
      Log in
    </button>
    <button className="outline">Continue with GitHub</button>
    <p className="center">
      Don't have an account? {' '}
      <button type="button" onClick={() => setPage('signup')}>
        Sign up
      </button>
    </p>
  </div>
);
}

export default Login;
