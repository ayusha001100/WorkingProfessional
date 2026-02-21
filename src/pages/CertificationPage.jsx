import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Share2, Eye, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';

export default function CertificationPage() {
    const { userData } = useAuth();
    const { theme } = useTheme();

    const userName = userData?.name || 'Professional';
    const userRole = userData?.onboarding?.dreamRole || 'Professional';
    const completionDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const credentialId = `AI-FP-${Date.now().toString(36).toUpperCase()}`;

    const capstoneItems = [
        'RAG assistant',
        'Automation / agent workflow',
        'KPI dashboard',
        'Executive pitch deck'
    ];

    const handleDownload = () => {
        // TODO: Implement certificate download
        console.log('Download certificate');
    };

    const handleShareLinkedIn = () => {
        const text = encodeURIComponent(`I've completed the AI-First Professional certification! 🚀`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
    };

    const handleViewPortfolio = () => {
        // TODO: Navigate to portfolio page
        console.log('View portfolio');
    };

    return (
        <DashboardLayout showSidebar={true}>
            <div style={{
                minHeight: '100vh',
                background: theme === 'light' ? '#fafafa' : 'var(--bg-primary)',
                padding: '3rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}>
                <div style={{
                    maxWidth: '800px',
                    width: '100%'
                }}>
                    {/* Achievement Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: theme === 'light' ? '#f0fdf4' : 'rgba(16, 185, 129, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: theme === 'light' ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <CheckCircle2 size={48} color="#10b981" strokeWidth={2} />
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            textAlign: 'center',
                            margin: '0 0 1rem 0',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2
                        }}
                    >
                        You're now an AI-First Professional
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            fontSize: '1.1rem',
                            color: theme === 'light' ? '#6b7280' : '#9ca3af',
                            textAlign: 'center',
                            margin: '0 0 3rem 0',
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        You've completed the 9-level journey and proven your ability to apply AI in real work.
                    </motion.p>

                    {/* Certification Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            background: theme === 'light' ? '#ffffff' : '#121212',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            marginBottom: '3rem',
                            border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a',
                            boxShadow: theme === 'light' 
                                ? '0 4px 20px rgba(0, 0, 0, 0.06)' 
                                : '0 4px 20px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '2rem',
                            paddingBottom: '2rem',
                            borderBottom: theme === 'light' ? '1px solid #f3f4f6' : '1px solid #2a2a2a'
                        }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '12px',
                                background: theme === 'light' ? '#f0fdf4' : 'rgba(16, 185, 129, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Award size={28} color="#10b981" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#64748b',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.25rem'
                                }}>
                                    Certified
                                </div>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.01em'
                                }}>
                                    AI-First {userRole}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#64748b',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.5rem'
                                }}>
                                    Name
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)'
                                }}>
                                    {userName}
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#64748b',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.5rem'
                                }}>
                                    Completion Date
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)'
                                }}>
                                    {completionDate}
                                </div>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#64748b',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '0.5rem'
                                }}>
                                    Credential ID
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: theme === 'light' ? '#6b7280' : '#9ca3af',
                                    fontFamily: 'monospace'
                                }}>
                                    {credentialId}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Capstone Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            background: theme === 'light' ? '#ffffff' : '#121212',
                            borderRadius: '16px',
                            padding: '2rem',
                            marginBottom: '3rem',
                            border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a',
                            boxShadow: theme === 'light' 
                                ? '0 2px 8px rgba(0, 0, 0, 0.04)' 
                                : '0 2px 8px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '1.5rem'
                        }}>
                            Capstone Deliverables
                        </div>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            {capstoneItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontSize: '0.95rem',
                                        color: 'var(--text-primary)',
                                        fontWeight: 500
                                    }}
                                >
                                    <div style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        flexShrink: 0
                                    }} />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Primary Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                            onClick={handleDownload}
                            style={{
                                padding: '0.875rem 2rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: '#ff5722',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 2px 8px rgba(255, 87, 34, 0.25)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ff6b3d';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 87, 34, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ff5722';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 87, 34, 0.25)';
                            }}
                        >
                            <Download size={18} />
                            Download Certificate
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                            onClick={handleShareLinkedIn}
                            style={{
                                padding: '0.875rem 2rem',
                                borderRadius: '10px',
                                border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a',
                                background: theme === 'light' ? '#ffffff' : '#1a1a1a',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#f9fafb' : '#2a2a2a';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#ffffff' : '#1a1a1a';
                            }}
                        >
                            <Share2 size={18} />
                            Share on LinkedIn
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                            onClick={handleViewPortfolio}
                            style={{
                                padding: '0.875rem 2rem',
                                borderRadius: '10px',
                                border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a',
                                background: theme === 'light' ? '#ffffff' : '#1a1a1a',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#f9fafb' : '#2a2a2a';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = theme === 'light' ? '#ffffff' : '#1a1a1a';
                            }}
                        >
                            <Eye size={18} />
                            View Portfolio
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
