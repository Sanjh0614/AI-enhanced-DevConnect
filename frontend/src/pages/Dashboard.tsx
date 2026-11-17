import AnimatedSection from "../components/animatedsection";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
    LayoutDashboard,
    CodeXml,
    FolderGit2,
    BrainCircuit,
    Target,
    TrendingUp,
    Settings,
    LogOut,
    Bell,
    Search,
    Code2,
    Menu,
    X,
    ArrowUpRight,
} from "lucide-react";
import "./dashboard.css";

interface DashboardProps {
    userEmail: string;
}

const navigation = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "GitHub Profile", icon: CodeXml },
    { label: "Repositories", icon: FolderGit2 },
    { label: "AI Developer Agent", icon: BrainCircuit },
    { label: "Role Assessment", icon: Target },
    { label: "Growth Tracker", icon: TrendingUp },
];

export default function Dashboard({ userEmail }: DashboardProps) {
    const [loggingOut, setLoggingOut] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [message, setMessage] = useState("");

    async function handleLogout() {
        setLoggingOut(true);

        const { error } = await supabase.auth.signOut();

        if (error) {
            setMessage(error.message);
            setLoggingOut(false);
        }
    }

    return (
        <main className="dashboard-layout">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

                <div className="dashboard-brand">
                    <span className="dashboard-brand-icon">
                        <Code2 size={23} />
                    </span>
                    <span>
                        DevConnect<span className="brand-dot">.</span>
                    </span>

                    <button
                        className="mobile-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close navigation"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-section-label">WORKSPACE</div>

                <nav className="dashboard-navigation">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className={`sidebar-nav-item ${item.active ? "active" : "disabled-nav"}`}
                                title={!item.active ? "Available in upcoming development stages" : ""}
                            >
                                <Icon size={19} />
                                <span>{item.label}</span>
                                {item.active && <span className="active-indicator" />}
                            </div>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-section-label">ACCOUNT</div>

                    <div className="sidebar-nav-item disabled-nav">
                        <Settings size={19} />
                        <span>Settings</span>
                    </div>

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <LogOut size={19} />
                        <span>{loggingOut ? "Signing out..." : "Logout"}</span>
                    </button>

                    {message && <p className="dashboard-error">{message}</p>}

                    <div className="sidebar-user">
                        <div className="user-avatar">
                            {userEmail.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="sidebar-user-info">
                            <strong>My Account</strong>
                            <span>{userEmail}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <section className="dashboard-main">

                {/* TOPBAR */}
                <header className="dashboard-topbar">
                    <div className="topbar-left">
                        <button
                            className="mobile-menu"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open navigation"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="dashboard-breadcrumb">
                            Workspace <span>/</span> Overview
                        </div>
                    </div>

                    <div className="topbar-right">
                        <div className="dashboard-search">
                            <Search size={17} />
                            <input
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                            />
                        </div>

                        <button
                            className="notification-button"
                            aria-label="Notifications"
                            title="Notifications"
                        >
                            <Bell size={19} />
                        </button>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <div className="dashboard-content">

                    <section className="dashboard-welcome">
                        <div>
                            <span className="dashboard-eyebrow">
                                DEVELOPER WORKSPACE
                            </span>

                            <h1>
                                Welcome back<span className="brand-dot">.</span>
                            </h1>

                            <p>
                                Your developer journey, all in one place.
                                Let's explore what your work says about you.
                            </p>
                        </div>

                        <div className="dashboard-date">
                            <span>YOUR WORKSPACE</span>
                            <strong>Developer Overview</strong>
                        </div>
                    </section>

                    {/* GITHUB CONNECTION */}
                    <AnimatedSection delay={0.1}>
                        <section className="github-connect-card">
                            <div className="github-card-icon">
                                <CodeXml size={27} />
                            </div>

                            <div className="github-card-content">
                                <h2>Connect your developer profile</h2>
                                <p>
                                    Synchronize your GitHub repositories to begin
                                    generating developer insights.
                                </p>
                            </div>

                            <div className="github-card-status">
                                <span className="status-dot" />
                                <span>Sync status will appear here</span>
                            </div>
                        </section>
                    </AnimatedSection>

                    {/* ANALYTICS */}
                    <section className="dashboard-section">
                        <div className="dashboard-section-heading">
                            <div>
                                <h2>Developer Analytics</h2>
                                <p>Your repository overview and activity.</p>
                            </div>

                            <span className="section-period">ALL REPOSITORIES</span>
                        </div>

                        <div className="dashboard-metrics">
                            {[
                                { label: "Repositories", icon: FolderGit2 },
                                { label: "Languages", icon: Code2 },
                                { label: "Total Stars", icon: ArrowUpRight },
                                { label: "Total Forks", icon: CodeXml },
                            ].map((metric) => {
                                const Icon = metric.icon;

                                return (
                                    <article className="metric-card" key={metric.label}>
                                        <div className="metric-card-top">
                                            <span>{metric.label}</span>
                                            <Icon size={19} />
                                        </div>

                                        <strong>—</strong>

                                        <p>Awaiting repository data</p>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    {/* INTELLIGENCE PREVIEW */}
                    <section className="dashboard-section">
                        <div className="dashboard-section-heading">
                            <div>
                                <h2>Developer Intelligence</h2>
                                <p>Understand your technical profile with AI.</p>
                            </div>
                        </div>

                        <div className="intelligence-grid">
                            <article className="intelligence-card">
                                <div className="intelligence-icon">
                                    <BrainCircuit size={23} />
                                </div>
                                <h3>AI Developer Agent</h3>
                                <p>
                                    Ask questions about your projects, technologies
                                    and demonstrated technical strengths.
                                </p>
                                <span className="coming-soon">UPCOMING MODULE</span>
                            </article>

                            <article className="intelligence-card">
                                <div className="intelligence-icon">
                                    <Target size={23} />
                                </div>
                                <h3>Role Assessment</h3>
                                <p>
                                    Understand how your project evidence aligns
                                    with your target developer role.
                                </p>
                                <span className="coming-soon">UPCOMING MODULE</span>
                            </article>

                            <article className="intelligence-card">
                                <div className="intelligence-icon">
                                    <TrendingUp size={23} />
                                </div>
                                <h3>Growth Tracker</h3>
                                <p>
                                    Track changes in your projects, skills and
                                    technical evidence over time.
                                </p>
                                <span className="coming-soon">UPCOMING MODULE</span>
                            </article>
                        </div>
                    </section>

                    {/* REPOSITORY PLACEHOLDER */}
                    <section className="dashboard-section">
                        <div className="dashboard-section-heading">
                            <div>
                                <h2>Your Repositories</h2>
                                <p>Your imported GitHub projects will appear here.</p>
                            </div>
                        </div>

                        <div className="repository-empty">
                            <div className="empty-icon">
                                <FolderGit2 size={28} />
                            </div>

                            <h3>Repository data will appear here</h3>
                            <p>
                                Once your GitHub repositories are loaded,
                                you can explore your projects from this section.
                            </p>
                        </div>
                    </section>

                    <footer className="dashboard-footer">
                        <span>© 2026 DevConnect</span>
                        <span>Developer intelligence, built around your journey.</span>
                    </footer>

                </div>
            </section>
        </main>
    );
}
