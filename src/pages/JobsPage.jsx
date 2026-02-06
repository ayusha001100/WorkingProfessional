import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Briefcase, MapPin, Building2, Star, CheckCircle, ChevronRight, Upload, Lock as LockIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { generatePersonalizedJobs } from '../utils/dynamicDataGenerator';

export default function JobsPage() {
    const { userData } = useAuth();
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchJobs = async () => {
            // Generate personalized jobs based on user data
            const jobsData = generatePersonalizedJobs(userData);
            setJobs(jobsData);
            setLoading(false);
        };

        if (userData) {
            fetchJobs();
        }
    }, [userData]);

    if (loading) return <DashboardLayout><div>Loading jobs...</div></DashboardLayout>;

    // Locked State for Non-Premium Users
    if (!userData?.isPremium) {
        return (
            <DashboardLayout>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', paddingTop: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <div style={{ width: '80px', height: '80px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <LockIcon size={40} color="#ff5722" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Premium Access Required</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Our AI-curated Job Board is exclusively available to Premium members. Get matched with top tech companies based on your skills.
                        </p>
                        <div style={{ padding: '1rem', background: '#fff7ed', borderRadius: '12px', border: '1px solid #ffedd5', color: '#c2410c', fontSize: '0.9rem', display: 'inline-block' }}>
                            <strong>Note:</strong> Already paid? Access is manually activated by our team. Check back shortly!
                        </div>
                    </motion.div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Jobs & Internships</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>AI-matched opportunities based on your skills and resume.</p>
                    </div>
                    <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Upload size={18} /> Rescan Resume
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            whileHover={{ y: -5 }}
                            className="glass-card"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                                    <Building2 size={24} color="var(--accent-primary)" />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Match Score</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: job.matchScore > 80 ? '#22c55e' : 'var(--accent-primary)' }}>{job.matchScore}%</div>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.4rem' }}>{job.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '1.5rem' }}>{job.company}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <MapPin size={14} /> {job.location}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <Star size={14} /> {job.salary}
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--border-color)', marginBottom: '2rem', flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>AI Insights</div>
                                {job.missingSkills[0] === "None" ? (
                                    <p style={{ fontSize: '0.85rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={14} /> You have all required skills!
                                    </p>
                                ) : (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                        Fill your skill gap in <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{job.missingSkills.join(', ')}</span> to reach 100% match.
                                    </p>
                                )}
                            </div>

                            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Apply Now <ChevronRight size={18} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
