function CheckEmail({ setPage }) {

    return (
        <div>
            <h1>Check your email</h1>
            <p>Please check your inbox for a verification link</p>

            <button className="primary" onClick={() => {}}>
                Resend email
            </button>
            <button onClick={() => setPage('login')}>
                Back to log in
            </button>
        </div>
    );
}

export default CheckEmail;