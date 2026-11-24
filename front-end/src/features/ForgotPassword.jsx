import { useState } from "react";
import BackButton from "./BackButton.jsx";

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState(""); // same as before
  const [securityAnswer, setSecurityAnswer] = useState(""); // NEW
  const [newPassword, setNewPassword] = useState(""); // NEW
  const [message, setMessage] = useState(""); // same as before
  const [isReset, setIsReset] = useState(false); // NEW: becomes true after a successful reset

  async function handleSubmit() {
    if (!email.trim() || !securityAnswer.trim() || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        securityAnswer: securityAnswer,
        newPassword: newPassword,
      }),
    });
    const data = await response.json();

    setMessage(data.message);
    if (data.success) {
      setIsReset(true);
    }
  }

  if (isReset) {
    return (
      <div>
        <h1>Password reset</h1>
        <p>{message}</p>
        <button className="primary" onClick={() => setPage("login")}>
          Back to log in
        </button>
      </div>
    );
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
      <p>Security question: What was the name of your first pet?</p>
      <input
        type="text"
        placeholder="Your answer"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {message && <p className="add-error">{message}</p>}
      <button className="primary" onClick={handleSubmit}>
        Reset password
      </button>
    </div>
  );
}

export default ForgotPassword;
