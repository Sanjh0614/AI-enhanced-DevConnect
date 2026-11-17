
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Code2,
    Eye,
    EyeOff,
    UserRound,
    Mail,
    LockKeyhole,
    Sparkles,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import "./auth.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage("");
        setIsSuccess(false);
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: name.trim(),
                    },
                },
            });

            if (error) {
                setMessage(error.message);
                return;
            }

            setIsSuccess(true);

            if (data.session) {
                setMessage("Your account has been created successfully. You can now sign in.");
            } else {
                setMessage(
                    "Account created! Please check your email and verify your address before signing in."
                );
            }
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-background-glow" />

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

            <section className="auth-main">
                <div className="auth-decoration">
                    <span className="auth-pill">
                        <Sparkles size={14} />
                        YOUR DEVELOPER JOURNEY STARTS HERE
                    </span>

                    <h1>
                        Build your profile.
                        <br />
                        <span className="auth-gradient-text">
                            Discover your potential.
                        </span>
                    </h1>

                    <p>
                        Connect your GitHub projects, understand your technical
                        strengths, and turn your developer journey into meaningful
                        insights.
                    </p>

                    <div className="auth-benefits">
                        <div>
                            <span className="benefit-check">✓</span>
                            AI-powered developer insights
                        </div>
                        <div>
                            <span className="benefit-check">✓</span>
                            Evidence-based skill analysis
                        </div>
                        <div>
                            <span className="benefit-check">✓</span>
                            Personalized career recommendations
                        </div>
                    </div>

                    <div className="auth-orbit auth-orbit-one" />
                    <div className="auth-orbit auth-orbit-two" />
                </div>

                <div className="auth-card">
                    <div className="auth-card-heading">
                        <div className="auth-card-icon">
                            <UserRound size={23} />
                        </div>
                        <span className="auth-card-label">CREATE YOUR ACCOUNT</span>
                        <h2>Join DevConnect</h2>
                        <p>Start understanding your developer potential.</p>
                    </div>

                    <form onSubmit={handleSignup} className="auth-form">
                        <label htmlFor="signup-name">Full name</label>
                        <div className="auth-input-wrapper">
                            <UserRound size={18} />
                            <input
                                id="signup-name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="name"
                                required
                            />
                        </div>

                        <label htmlFor="signup-email">Email address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={18} />
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>

                        <label htmlFor="signup-password">Password</label>
                        <div className="auth-input-wrapper">
                            <LockKeyhole size={18} />
                            <input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password"
                                minLength={6}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <p className="auth-password-hint">
                            Use at least 6 characters.
                        </p>

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create account"}
                            {!loading && <ArrowRight size={18} />}
                        </button>

                        {message && (
                            <p
                                className={`auth-message ${isSuccess ? "success" : "error"}`}
                                role="status"
                            >
                                {message}
                            </p>
                        )}
                    </form>

                    <div className="auth-divider">
                        <span />
                        <p>ALREADY PART OF DEVCONNECT?</p>
                        <span />
                    </div>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login">Sign in</Link>
                    </p>

                    <p className="auth-terms">
                        By creating an account, you agree to use DevConnect
                        responsibly and securely.
                    </p>
                </div>
            </section>

            <footer className="auth-footer">
                <span>© 2026 DevConnect</span>
                <span>Developer intelligence, built around your journey.</span>
            </footer>
        </main>
    );
}
