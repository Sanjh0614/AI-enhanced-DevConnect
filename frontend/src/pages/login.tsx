
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Code2,
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./auth.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                return;
            }

            if (!data.session) {
                setMessage("Login succeeded, but no session was returned.");
                return;
            }
            console.log("ACCESS TOKEN:", data.session.access_token);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${data.session.access_token}`,
                    },
                }
            );

            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                await supabase.auth.signOut();
                setMessage(
                    result.detail ?? "Unable to verify your account with the backend."
                );
                return;
            }

            navigate("/dashboard");
        } catch {
            setMessage(
                "Could not connect to the backend. Please check that FastAPI is running."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-background-glow" />

            {/* Navigation */}
            <nav className="auth-nav">
                <Link to="/" className="auth-brand">
                    <span className="auth-brand-icon">
                        <Code2 size={22} />
                    </span>
                    DevConnect<span className="auth-brand-dot">.</span>
                </Link>

                <Link to="/" className="auth-back-link">
                    Back to home
                    <ArrowRight size={15} />
                </Link>
            </nav>

            {/* Login content */}
            <section className="auth-main">
                {/* Left content */}
                <div className="auth-decoration">
                    <span className="auth-pill">
                        <Sparkles size={14} />
                        YOUR DEVELOPER JOURNEY CONTINUES
                    </span>

                    <h1>
                        Welcome back.
                        <br />
                        <span className="auth-gradient-text">
                            Let's build what's next.
                        </span>
                    </h1>

                    <p>
                        Your developer journey is always evolving.
                        Sign in to revisit your insights, explore your
                        projects and discover your next opportunity.
                    </p>

                    <div className="auth-benefits">
                        <div>
                            <span className="benefit-check">✓</span>
                            Revisit your developer insights
                        </div>

                        <div>
                            <span className="benefit-check">✓</span>
                            Explore your GitHub analysis
                        </div>

                        <div>
                            <span className="benefit-check">✓</span>
                            Continue improving your skills
                        </div>
                    </div>

                    <div className="auth-orbit auth-orbit-one" />
                    <div className="auth-orbit auth-orbit-two" />
                </div>

                {/* Login form */}
                <div className="auth-card">
                    <div className="auth-card-heading">
                        <div className="auth-card-icon">
                            <ShieldCheck size={23} />
                        </div>

                        <span className="auth-card-label">
                            WELCOME BACK
                        </span>

                        <h2>Sign in to DevConnect</h2>

                        <p>
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
                        <label htmlFor="login-email">Email address</label>

                        <div className="auth-input-wrapper">
                            <Mail size={18} />

                            <input
                                id="login-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <label htmlFor="login-password">Password</label>

                        <div className="auth-input-wrapper">
                            <LockKeyhole size={18} />

                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                            {!loading && <ArrowRight size={18} />}
                        </button>

                        {message && (
                            <p className="auth-message error" role="alert">
                                {message}
                            </p>
                        )}
                    </form>

                    <div className="auth-divider">
                        <span />
                        <p>NEW TO DEVCONNECT?</p>
                        <span />
                    </div>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <Link to="/signup">Create account</Link>
                    </p>

                    <p className="auth-terms">
                        Your account and developer data are protected
                        through secure authentication.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="auth-footer">
                <span>© 2026 DevConnect</span>
                <span>Developer intelligence, built around your journey.</span>
            </footer>
        </main>
    );
}
