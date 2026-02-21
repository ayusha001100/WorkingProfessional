import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
    Calendar,
    FileText,
    Briefcase,
    Newspaper,
    Bot,
    User,
    Sparkles,
    ChevronDown,
    Check,
    Search,
    Sun,
    Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { JOB_ROLES } from '../data/jobRoles';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';

export default function DashboardLayout({ children, showSidebar = true, headerExtras }) {
    const { user, userData, logout, setUserData, updateUserData } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const navigate = useNavigate();
    const location = useLocation();

    // Role Dropdown State
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [roleSearchTerm, setRoleSearchTerm] = useState("");
    const roleDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
                setIsRoleDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [roleDropdownRef]);

    const handleLogout = async () => {
        const success = await logout();
        if (success) navigate('/');
    };

    const handleRoleSelect = async (newRole) => {
        try {
            await updateUserData({
                'onboarding.dreamRole': newRole
            });
            setIsRoleDropdownOpen(false);
        } catch (err) {
            console.error("Failed to update role:", err);
        }
    };

    // Filter roles based on search
    const filteredRoles = JOB_ROLES.filter(role =>
        role.toLowerCase().includes(roleSearchTerm.toLowerCase())
    );

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/track' },
        { icon: <FileText size={20} />, label: 'Resume Builder', path: '/resume-builder' },
        { icon: <Bot size={20} />, label: 'Mock Interviews', path: '/mock-interviews' },
        { icon: <Newspaper size={20} />, label: 'AI Career News', path: '/news' },
        { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
        { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
        { icon: <Award size={20} />, label: 'Certification', path: '/certificate' },
    ];

    const currentRole = userData?.onboarding?.dreamRole || 'Aspiring Pro';

    // Journey & Mastery Calculation
    const totalLevels = GEN_AI_COURSE.modules.length;
    const completedLevels = Object.values(userData?.progress?.moduleProgress || {})
        .filter(m => m.completed).length;

    const totalSubModules = Object.values(SUB_MODULES_CONTENT).reduce((acc, levelSubModules) =>
        acc + Object.keys(levelSubModules).length, 0);

    const completedSubModules = Object.values(userData?.progress?.subModuleProgress || {}).reduce((acc, levelProgress) =>
        acc + Object.values(levelProgress).filter(sm => sm.completed).length, 0);

    const masteryPercent = totalSubModules > 0 ? Math.round((completedSubModules / totalSubModules) * 100) : 0;
    const journeyPercent = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

    return (
        <div className="dashboard-layout">
            {/* Sidebar - Premium with Labels */}
            {showSidebar && (
                <aside className="sidebar" style={{
                    background: isDarkMode ? 'rgba(10, 10, 10, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(32px)',
                    borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)',
                    padding: '2rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '280px',
                    zIndex: 100,
                    boxShadow: theme === 'light' ? '20px 0 60px rgba(0,0,0,0.02)' : '20px 0 60px rgba(0,0,0,0.2)'
                }}>
                    {/* Logo Section */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '3.5rem',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '16px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onClick={() => navigate('/')}
                    >
                        <img src={isDarkMode ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                color: 'var(--text-primary)',
                                lineHeight: 1,
                                margin: 0
                            }}>
                                LetsUpgrade
                            </h2>
                            <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#FF5722',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginTop: '4px',
                                display: 'block'
                            }}>
                                Professional
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.875rem 1.25rem',
                                    borderRadius: '16px',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : 'var(--text-secondary)',
                                    background: isActive
                                        ? 'linear-gradient(135deg, #FF5722 0%, #ff8a50 100%)'
                                        : 'transparent',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: isActive ? 700 : 500,
                                    boxShadow: isActive ? '0 10px 25px -5px rgba(255, 87, 34, 0.3)' : 'none',
                                    border: 'none'
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        {React.cloneElement(item.icon, {
                                            size: 20,
                                            strokeWidth: isActive ? 2.5 : 2,
                                            style: { transition: 'all 0.2s', flexShrink: 0, color: isActive ? '#fff' : 'inherit' }
                                        })}
                                        <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* Upgrade to Pro Button */}
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = 'https://pages.razorpay.com/pl_S7Hmm9y3KCV723/view'}
                            style={{
                                marginTop: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                background: isDarkMode ? 'rgba(255, 87, 34, 0.08)' : 'rgba(255, 87, 34, 0.04)',
                                color: '#FF5722',
                                border: '1px solid rgba(255, 87, 34, 0.2)',
                                cursor: 'pointer',
                                fontWeight: 800,
                                transition: 'all 0.3s ease',
                                width: '100%',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Sparkles size={20} color="#FF5722" fill="rgba(255, 87, 34, 0.2)" />
                            <span style={{ fontSize: '0.95rem', letterSpacing: '0.01em' }}>Upgrade to Pro</span>
                        </motion.button>
                    </nav>

                    {/* Footer / User Profile */}
                    <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                borderRadius: '20px',
                                background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                marginBottom: '1rem'
                            }}
                            onClick={() => navigate('/profile')}
                        >
                            <div style={{
                                width: '42px', height: '42px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1rem', fontWeight: 900, color: '#fff',
                                boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)'
                            }}>
                                {userData?.name?.[0] || 'U'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{userData?.name || 'User'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>{currentRole}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={toggleTheme}
                                style={{
                                    flex: 1, height: '44px', borderRadius: '14px', border: 'none',
                                    background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
                                    color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                                }}
                            >
                                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <button
                                onClick={handleLogout}
                                style={{
                                    flex: 1, height: '44px', borderRadius: '14px', border: 'none',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700
                                }}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <main className="main-content" style={{
                marginLeft: showSidebar ? '280px' : undefined,
                background: 'var(--bg-primary)',
                minHeight: '100vh',
                position: 'relative'
            }}>
                {/* Header - Transparent & Premium */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 4rem', // Increased side padding
                    background: isDarkMode ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 90,
                    borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    gap: '2rem' // Added gap between left and right sections
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem', flexShrink: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '140px' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Progress</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px', whiteSpace: 'nowrap' }}>
                                Hey <span style={{ color: '#ff5722' }}>{userData?.name?.split(' ')[0] || 'there'}!</span> 👋
                            </div>
                        </div>

                        {headerExtras || (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '2.5rem', borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                                        <span>JOURNEY MASTERY</span>
                                        <span style={{ color: '#ff5722' }}>{masteryPercent}%</span>
                                    </div>
                                    <div style={{ width: '120px', height: '6px', background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${masteryPercent}%` }} style={{ height: '100%', background: '#ff5722', borderRadius: '10px' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexShrink: 0 }}>
                        {/* Role Selector Pill */}
                        <div style={{ position: 'relative' }} ref={roleDropdownRef}>
                            <motion.button
                                whileHover={{ y: -1 }}
                                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                style={{
                                    height: '42px', padding: '0 1.25rem', borderRadius: '14px',
                                    background: isDarkMode ? '#111' : '#fff',
                                    border: `1px solid ${isRoleDropdownOpen ? '#ff5722' : 'var(--border-color)'}`,
                                    color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)', fontWeight: 700, fontSize: '0.85rem'
                                }}
                            >
                                <div style={{ padding: '4px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '6px' }}>
                                    <Briefcase size={14} color="#ff5722" />
                                </div>
                                {currentRole}
                                <ChevronDown size={14} style={{ transform: isRoleDropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                            </motion.button>

                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {isRoleDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        style={{
                                            position: 'absolute', top: '120%', right: 0, width: '300px',
                                            background: isDarkMode ? '#161616' : '#fff', borderRadius: '24px',
                                            boxShadow: '0 30px 60px rgba(0,0,0,0.2)', padding: '1.25rem', zIndex: 1000,
                                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`
                                        }}
                                    >
                                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                                            <Search size={16} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                            <input
                                                type="text" placeholder="Switch professional track..."
                                                value={roleSearchTerm} onChange={e => setRoleSearchTerm(e.target.value)}
                                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', background: isDarkMode ? '#0d0d0d' : '#f8fafc', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                                            />
                                        </div>
                                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {filteredRoles.map(role => (
                                                <div
                                                    key={role} onClick={() => handleRoleSelect(role)}
                                                    style={{ padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: role === currentRole ? 'rgba(255,87,34,0.1)' : 'transparent', color: role === currentRole ? '#ff5722' : 'var(--text-secondary)', fontWeight: role === currentRole ? 700 : 500 }}
                                                >
                                                    {role}
                                                    {role === currentRole && <Check size={14} />}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Points/Modules Pill */}
                        <div style={{
                            height: '42px', padding: '0 1.25rem', borderRadius: '14px',
                            background: isDarkMode ? '#111' : '#fff',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px',
                            fontWeight: 800, fontSize: '0.9rem'
                        }}>
                            <div style={{ padding: '5px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px' }}>
                                <Sparkles size={14} color="#3b82f6" fill="#3b82f6" />
                            </div>
                            {userData?.progress?.xp || 0}
                        </div>

                        {/* Streak Pill */}
                        <div style={{
                            height: '42px', padding: '0 1.25rem', borderRadius: '14px',
                            background: isDarkMode ? 'rgba(255, 87, 34, 0.1)' : '#fff7f0',
                            border: '1px solid rgba(255, 87, 34, 0.2)',
                            color: '#ff5722', display: 'flex', alignItems: 'center', gap: '8px',
                            fontWeight: 900, fontSize: '0.9rem'
                        }}>
                            <Zap size={16} fill="#ff5722" />
                            <span>{userData?.stats?.streak || 0}</span>
                        </div>

                        {/* Go Pro Button */}
                        <motion.button
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open('https://drive.google.com/file/d/1iLz007ulIsCzbGwElQ7LN50TUgTin9H5/view?usp=sharing', '_blank')}
                            style={{
                                height: '42px', padding: '0 1.25rem', borderRadius: '14px',
                                background: isDarkMode ? '#FF5722' : '#FF5722',
                                color: '#fff', border: 'none',
                                fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '6px',
                                boxShadow: '0 4px 15px rgba(255, 87, 34, 0.3)'
                            }}
                        >
                            <FileText size={14} />
                            Brochure
                        </motion.button>
                    </div>
                </header>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
