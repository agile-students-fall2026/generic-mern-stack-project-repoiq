import { useState } from "react";

function CheckEmail({ setPage, emailRequest }) {
    const [message, setMessage] = useState("");

    async function handleResend() {
        try {
            const response = await fetch("/api/resend-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailRequest),
            });

            const data = await response.json();
            setMessage(
                response.ok
                ? data.message
                : "Could not resend the email. Please try again"
            );
        } catch {
            setMessage("Could not resend the email. Please try again");
        }
    }

    return (
        <div>
            <h1>Check your email</h1>
            <p>
                {emailRequest.purpose === "reset"
                    ? "Your password reset request has been received."
                    : "Your signup request has been received."}
            </p>
            <p>Please check your inbox for a verification link. No email is sent in this demo.</p>

            <button className="primary" onClick={handleResend}>
                Resend email
            </button>
            {message && <p role="status">{message}</p>}
            <button className="outline" onClick={() => setPage('login')}>
                Back to log in
            </button>
        </div>
    );
}

export default CheckEmail;