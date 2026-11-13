import BackButton from './BackButton.jsx';
import { useState } from 'react';

function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <header className="add-header">
        <BackButton setPage={setPage} to="welcome" />
        <h1>Log in</h1>
      </header>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
