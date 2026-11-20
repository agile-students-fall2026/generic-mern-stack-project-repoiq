import { useState } from 'react';
import BackButton from './BackButton.jsx';

function ForgotPassword({ setPage }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit() {
        if (!email.trim()) {
            setMessage('Please enter your email.');
            return;
        }

        setMessage('Password reset is not available yet.')
    }

    return (
        <div>
            <header className="add-header">
                <BackButton setPage={setPage} to="login" />
                <h1>Forgot password</h1>
            </header>
            <p> Enter your email to reset your password.</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {message && <p>{message}</p>}
            <button className="primary" onClick={handleSubmit}>
                Reset password
            </button>
        </div>
    );
}

export default ForgotPassword;