import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import BackButton from './BackButton.jsx';
function Signup({ setPage, setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup() {   
    if (password !== confirmPassword) {                           
      setError("Passwords don't match.");
      return;
    }
  
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });
  const data = await response.json();

  if (data.success) {
    setPage('check-email');
  } else {
    setError(data.message);
  }
}       

async function handleGitHubSignup() {
  try {
    const response = await fetch("/api/auth/github", { method: "POST" });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.message || "Could not sign in with GitHub.");
      return;
    }

    setUser(data.user);
    setPage("home");
  } catch {
    setError("Could not sign in with GitHub.");
  }
}

  return (
    <div className="signup">
      <header className="add-header">
        <BackButton setPage={setPage} to="welcome" />
        <h1>Create an account</h1>
      </header>
      
      <p className="intro">Join RepoiQ and start exploring any codebase.</p>

      <div className="signup-input-box">
        <User size={18} />
        <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="signup-input-box">
        <Mail size={18} />
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="signup-input-box">
        <Lock size={18} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <p className="small">At least 8 characters with a number and a letter</p>

      <div className="signup-input-box">
        <Lock size={18} />
        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      {error && <p className="add-error">{error}</p>}

      <button className="primary" onClick={handleSignup}>
        Sign Up
      </button>

      <p className="center">——— or continue with ———</p>

      <button className="outline" onClick={handleGitHubSignup}>Continue with GitHub</button>

      <p className="center">
        Already have an account?{' '}
        <span className="link" onClick={() => setPage('login')}>
          Log in
        </span>
      </p>
    </div>
  );
}

export default Signup;
