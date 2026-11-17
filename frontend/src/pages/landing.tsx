
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
    ArrowRight,
    Code2,
    BrainCircuit,
    Target,
    BarChart3,
    GitBranch,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import "./landing.css";

const features = [
    {
        icon: Code2,
        title: "GitHub Intelligence",
        description:
            "Explore your repositories, programming languages, project activity and development patterns.",
    },
    {
        icon: BrainCircuit,
        title: "AI Developer Analysis",
        description:
            "Turn your project evidence into meaningful technical strengths and developer insights.",
    },
    {
        icon: Target,
        title: "Role-Based Evaluation",
        description:
            "Understand how your demonstrated skills align with your desired software engineering role.",
    },
    {
        icon: BarChart3,
        title: "Personalized Insights",
        description:
            "Discover skill gaps, project highlights and practical recommendations for your growth.",
    },
];

const steps = [
    {
        number: "01",
        title: "Create your account",
        description: "Sign up and access your personal developer workspace.",
    },
    {
        number: "02",
        title: "Connect GitHub",
        description: "Import your public repositories using your GitHub username.",
    },
    {
        number: "03",
        title: "Analyze your profile",
        description: "Let DevConnect examine your repository and project evidence.",
    },
    {
        number: "04",
        title: "Discover your potential",
        description: "Explore your strengths, skill gaps and personalized next steps.",
    },
];

function Landing() {
    return (
        <main className="landing-page">
            <div className="landing-background-glow" />


            {/* Navigation */}
            <motion.nav
                className="landing-nav"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <Link to="/" className="landing-brand">
                    <span className="brand-symbol">
                        <Code2 size={23} />
                    </span>
                    <span>
                        DevConnect<span className="brand-dot">.</span>
                    </span>
                </Link>

                <div className="landing-nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>

                    <Link to="/login" className="nav-signin">
                        Sign in
                    </Link>

                    <Link to="/signup" className="nav-get-started">
                        Get started <ArrowRight size={16} />
                    </Link>
                </div>
            </motion.nav>


            {/* Hero */}
            <section className="landing-hero">
                <div className="hero-copy">
                    <div className="hero-badge">
                        <span className="status-dot" />
                        AI-POWERED DEVELOPER INTELLIGENCE
                    </div>

                    <h1>
                        Your code.
                        <br />
                        Your journey.
                        <br />
                        <span className="gradient-text">Your potential.</span>
                    </h1>

                    <p className="hero-description">
                        Your GitHub repositories tell a story about your
                        developer journey. Let AI help you understand your
                        strengths, identify skill gaps and discover what
                        you can build next.
                    </p>

                    <div className="hero-actions">
                        <Link to="/signup" className="gradient-button">
                            Analyze your GitHub
                            <ArrowRight size={19} />
                        </Link>

                        <a href="#how-it-works" className="outline-button">
                            Explore platform
                        </a>
                    </div>

                    <div className="hero-trust">
                        <ShieldCheck size={17} />
                        <span>Evidence-based insights. Your developer journey, clearly presented.</span>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="hero-visual">
                    <div className="visual-orbit orbit-one" />
                    <div className="visual-orbit orbit-two" />

                    <div className="dashboard-preview">
                        <div className="preview-topbar">
                            <div className="preview-brand">
                                <span className="preview-brand-icon">
                                    <Code2 size={16} />
                                </span>
                                Developer overview
                            </div>
                            <span className="preview-live">
                                <span className="status-dot" /> LIVE PREVIEW
                            </span>
                        </div>

                        <div className="preview-profile">
                            <div className="profile-avatar">
                                <Code2 size={27} />
                            </div>
                            <div>
                                <h3>Developer Profile</h3>
                                <p>AI-powered profile overview</p>
                            </div>
                            <span className="preview-chip">ANALYZED</span>
                        </div>

                        <div className="preview-stats">
                            <div className="stat-card">
                                <span>Repositories</span>
                                <strong>24</strong>
                                <small><GitBranch size={12} /> Projects tracked</small>
                            </div>
                            <div className="stat-card">
                                <span>Languages</span>
                                <strong>06</strong>
                                <small><Code2 size={12} /> Detected</small>
                            </div>
                            <div className="stat-card">
                                <span>Insights</span>
                                <strong>AI</strong>
                                <small><Sparkles size={12} /> Generated</small>
                            </div>
                        </div>

                        <div className="preview-analysis">
                            <div className="analysis-heading">
                                <div>
                                    <span className="preview-label">PROFILE ANALYSIS</span>
                                    <h3>Technical overview</h3>
                                </div>
                                <BrainCircuit size={23} />
                            </div>

                            <div className="skill-row">
                                <div><span>Python</span><span>Project evidence</span></div>
                                <div className="skill-track"><span style={{ width: "82%" }} /></div>
                            </div>
                            <div className="skill-row">
                                <div><span>JavaScript</span><span>Project evidence</span></div>
                                <div className="skill-track"><span style={{ width: "68%" }} /></div>
                            </div>
                            <div className="skill-row">
                                <div><span>SQL</span><span>Project evidence</span></div>
                                <div className="skill-track"><span style={{ width: "57%" }} /></div>
                            </div>

                            <p className="preview-disclaimer">
                                Illustrative dashboard preview — sample values, not actual analysis.
                            </p>
                        </div>
                    </div>

                    <div className="floating-insight">
                        <span className="insight-icon"><Sparkles size={19} /></span>
                        <div>
                            <strong>AI insights</strong>
                            <p>Discover your next step</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform introduction */}
            <section className="landing-intro">
                <span className="section-pill">BUILT FOR DEVELOPERS</span>
                <h2>
                    More than numbers.
                    <br />
                    <span className="gradient-text">A clearer picture of your skills.</span>
                </h2>
                <p>
                    DevConnect connects your GitHub activity with AI-powered
                    analysis to help you understand what your work demonstrates
                    and where you can improve.
                </p>
            </section>

            {/* Features */}
            <section className="landing-features" id="features">
                <div className="section-heading">
                    <span className="section-pill">THE PLATFORM</span>
                    <h2>Everything you need to understand your journey</h2>
                    <p>
                        Transform your development work into actionable insights.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article className="feature-card" key={feature.title}>
                                <div className="feature-icon">
                                    <Icon size={24} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <span className="feature-arrow">
                                    <ArrowRight size={18} />
                                </span>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* How it works */}
            <section className="landing-how" id="how-it-works">
                <div className="section-heading">
                    <span className="section-pill">YOUR JOURNEY</span>
                    <h2>From GitHub to growth.</h2>
                    <p>A simple process to turn your work into useful insights.</p>
                </div>

                <div className="steps-grid">
                    {steps.map((step) => (
                        <article className="step-card" key={step.number}>
                            <span className="step-number">{step.number}</span>
                            <div className="step-line" />
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-final-cta">
                <div className="cta-glow" />

                <span className="section-pill">START YOUR JOURNEY</span>

                <h2>
                    Your next opportunity
                    <br />
                    starts with <span className="gradient-text">understanding yourself.</span>
                </h2>

                <p>
                    Connect your GitHub profile and discover what your projects
                    say about your developer journey.
                </p>

                <Link to="/signup" className="gradient-button">
                    Get started with DevConnect
                    <ArrowRight size={19} />
                </Link>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <Link to="/" className="landing-brand">
                    <span className="brand-symbol">
                        <Code2 size={20} />
                    </span>
                    <span>
                        DevConnect<span className="brand-dot">.</span>
                    </span>
                </Link>

                <p>Developer intelligence, built around your journey.</p>
                <span>© 2026 DevConnect</span>
            </footer>

            {/* Oversized brand at the very bottom */}
            <section className="landing-brand-footer">
                <div className="footer-glass-word" aria-hidden="true">
                    DevConnect
                </div>
            </section>

        </main>
    );
}

export default Landing;
