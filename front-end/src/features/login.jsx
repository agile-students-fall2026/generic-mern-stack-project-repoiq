import { useState } from 'react';
import BackButton from './BackButton.jsx';

function Login({ setPage, setUser }) {
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
    setUser(data.user);
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
    {error && <p className="add-error">{error}</p>}
    <button className="primary" onClick={handleLogin}>
      Log in
    </button>
    <button>Continue with GitHub</button>
    <br />
    <button onClick={() => setPage('signup')}>Create an account</button>
  </div>
);
}

export default Login;
