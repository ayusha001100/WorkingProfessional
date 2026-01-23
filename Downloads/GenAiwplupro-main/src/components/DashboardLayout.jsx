import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Trophy,
    Award,
    Settings,
    LogOut,
    Zap,
    MessageSquare,
    BarChart3,
    Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function DashboardLayout({ children }) {
    const { user, userData, logout } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const success = await logout();
        if (success) navigate('/');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/curriculum' },
        { icon: <BookOpen size={20} />, label: 'Modules', path: '/day1' },
        { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
        { icon: <Award size={20} />, label: 'Certification', path: '/certificate' },
        { icon: <Calendar size={20} />, label: 'Live Classes', path: '/live' },
    ];

    const completionPercentage = userData?.progress?.completedSections?.length
        ? Math.round((userData.progress.completedSections.length / 14) * 100)
        : 0;

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar glass">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px' }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>LetsUpgrade</h2>
                </div>

                <nav style={{ flex: 1 }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span style={{ fontWeight: 600 }}>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Progress Card */}
                <div style={{ background: 'var(--bg-tertiary)', padding: '1.2rem', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Overall Progress</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{completionPercentage}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${completionPercentage}%`, background: 'var(--accent-gradient)' }}></div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <ThemeToggle />
                    <button onClick={handleLogout} className="sidebar-item" style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}>
                        <LogOut size={20} />
                        <span style={{ fontWeight: 600 }}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{userData?.name?.split(' ')[0] || 'Member'}</span>!
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>You're on track to becoming a Gen AI expert.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{userData?.stats?.totalPoints || 0} Points</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Growth Warrior</div>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem' }}>
                            {userData?.name?.[0] || 'U'}
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
