import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

function AuthPage() {
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsSubmitting(true);
            setMessage("");

            if (isLoginMode) {
                const response = await loginUser({ email, password });
                localStorage.setItem("token", response.token);
                navigate("/tasks");
            } else {
                await registerUser({ name, email, password });
                setMessage("Registration successful. You can now log in.");
                setIsLoginMode(true);
                setName("");
                setPassword("");
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>{isLoginMode ? "Login" : "Register"}</h1>

            <form className="auth-form" onSubmit={handleSubmit}>
                {!isLoginMode && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? "Please wait..."
                        : isLoginMode
                            ? "Login"
                            : "Register"}
                </button>
            </form>

            <p className="message">{message}</p>

            <button
                className="switch-auth-btn"
                onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setMessage("");
                    setName("");
                    setEmail("");
                    setPassword("");
                }}
                disabled={isSubmitting}
            >
                {isLoginMode
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
            </button>
        </div>
    );
}

export default AuthPage;