import { useState } from 'react';
import BackButton from './BackButton.jsx';

function ForgotPassword({ setPage, setEmailRequest }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit() {
        if (!email.trim()) {
            setMessage('Please enter your email.');
            return;
        }

        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        });
        const data = await response.json();


        if (data.success) {
            setEmailRequest({ email: email.trim(), purpose: "reset" });
            setPage('check-email');
        } else {
            setMessage(data.message);
        }

       
    }

    
    return (
        <div>
            <header className="add-header">
                <BackButton setPage={setPage} to="login" />
                <h1>Forgot password</h1>
            </header>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {message && <p className="add-error">{message}</p>}
            <button className="primary" onClick={handleSubmit}>
                Reset password
            </button>
        </div>
    );
}

export default ForgotPassword;