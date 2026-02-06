import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Trophy, Medal, Crown, TrendingUp, Flame, Star, Target, MapPin, Globe, Building, ArrowRight, TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
export default function LeaderboardPage() {
    const { user, userData } = useAuth();
    const [view, setView] = useState('city');
    const [leaderboardData, setLeaderboardData] = useState({
        city: { location: "Mumbai", topThree: [], others: [], myZone: [] },
        state: { location: "Maharashtra", topThree: [], others: [], myZone: [] },
        country: { location: "India", topThree: [], others: [], myZone: [] }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMockData = () => {
            const city = userData?.onboarding?.city || 'Mumbai';
            const state = userData?.onboarding?.state || 'Maharashtra';

            const mockList = [
                { id: '1', name: 'Ayaan', points: 2450, role: 'Gen AI Specialist', rank: 1, avatar: 'A', isMe: false },
                { id: '2', name: 'Zoya', points: 2100, role: 'Data Scientist', rank: 2, avatar: 'Z', isMe: false },
                { id: '3', name: 'Ishaan', points: 1950, role: 'Prompt Engineer', rank: 3, avatar: 'I', isMe: false },
                { id: '4', name: 'Meera', points: 1800, role: 'AI Researcher', rank: 4, avatar: 'M', isMe: false },
                { id: '5', name: 'Rohan', points: 1650, role: 'Software Engineer', rank: 5, avatar: 'R', isMe: false },
            ];

            // Add current user if not in list
            if (user && !mockList.some(u => u.isMe)) {
                // Remove this block as we handle it in processLeaderboard
            }



            // Recalculate ranks based on points
            // Function to process a list: sort by points desc, assign rank
            const processLeaderboard = (list) => {
                // Ensure current user is in the list with latest XP
                let updatedList = [...list];
                const currentUserIndex = updatedList.findIndex(u => u.isMe);

                if (currentUserIndex >= 0) {
                    updatedList[currentUserIndex].points = userData?.progress?.xp || 0;
                } else if (user) {
                    updatedList.push({
                        id: user.uid,
                        name: userData?.name || 'You',
                        points: userData?.progress?.xp || 0,
                        role: userData?.onboarding?.role || 'Learner',
                        rank: 0,
                        avatar: (userData?.name || 'Y')[0],
                        isMe: true
                    });
                }

                // Sort descending
                updatedList.sort((a, b) => b.points - a.points);

                // Assign ranks
                updatedList = updatedList.map((u, i) => ({ ...u, rank: i + 1 }));
                return updatedList;
            };

            const sortedCity = processLeaderboard(mockList);
            // Dynamic State/Country lists could be different, but for now using the same logic with slight variations to simulate realism
            const sortedState = processLeaderboard([...mockList, { id: '6', name: 'Vikram', points: 3000, role: 'Senior Dev', rank: 0, avatar: 'V', isMe: false }]);
            const sortedCountry = processLeaderboard([...mockList, { id: '7', name: 'Ananya', points: 5000, role: 'AI Architect', rank: 0, avatar: 'A', isMe: false }]);

            setLeaderboardData({
                city: {
                    location: city,
                    topThree: sortedCity.slice(0, 3),
                    others: sortedCity.slice(3),
                    myZone: sortedCity.slice(0, 5) // Just showing top 5 as "myZone" for now
                },
                state: {
                    location: state,
                    topThree: sortedState.slice(0, 3),
                    others: sortedState.slice(3),
                    myZone: sortedState.slice(0, 5)
                },
                country: {
                    location: "India",
                    topThree: sortedCountry.slice(0, 3),
                    others: sortedCountry.slice(3),
                    myZone: sortedCountry.slice(0, 5)
                }
            });
            setLoading(false);
        };

        fetchMockData();
    }, [user?.uid, userData]);

    const currentData = leaderboardData[view];
    if (loading) return <DashboardLayout><div style={{ padding: '4rem', textAlign: 'center' }}>Loading Leaderboard...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem 4rem' }}>

                {/* Your Competitive Zone */}
                <div style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ff5722', textTransform: 'uppercase', marginBottom: '8px' }}>Your Competitive Zone</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>Rank #{currentData.myZone.find(u => u.isMe)?.rank || '-'} in {currentData.location}</h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0 }}>You are {Math.max(0, (currentData.myZone[0].points - (userData?.progress?.xp || 0)))} XP away from Rank #1</p>
                        </div>
                        <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {currentData.myZone.map(u => (
                                <div key={u.id} style={{ textAlign: 'center', opacity: u.isMe ? 1 : 0.5, transform: u.isMe ? 'scale(1.1)' : 'scale(1)', transition: 'all 0.3s' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: u.isMe ? '#ff5722' : 'rgba(255,255,255,0.1)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.7rem' }}>{u.avatar}</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800 }}>{u.isMe ? 'YOU' : u.name?.split(' ')[0]}</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>{u.points}</div>
                                </div>
                            ))}
                        </div>
                        <button style={{ background: '#fff', color: '#1a1a1a', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            View Battles <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* View Switcher */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    {['city', 'state', 'country'].map(t => (
                        <button key={t} onClick={() => setView(t)} style={{ padding: '0.6rem 1.5rem', borderRadius: '12px', border: 'none', background: view === t ? '#1a1a1a' : '#fff', color: view === t ? '#fff' : '#64748b', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer' }}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Podium & List logic continues as before with high-res styling */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#1a1a1a' }}>The Growth Arena</h2>
                    <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Daily active professionals in {currentData.location}</p>
                </div>

                {/* Top 3 Podium */}
                {view === 'city' && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', marginBottom: '5rem' }}>
                        <PodiumItem user={currentData.topThree[1]} height="140px" color="#94a3b8" />
                        <PodiumItem user={currentData.topThree[0]} height="200px" color="#FFD700" isWinner />
                        <PodiumItem user={currentData.topThree[2]} height="110px" color="#b45309" />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

function PodiumItem({ user, height, color, isWinner = false }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '160px' }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div style={{ width: isWinner ? '80px' : '64px', height: isWinner ? '80px' : '64px', borderRadius: '24px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `4px solid ${color}`, fontSize: isWinner ? '1.8rem' : '1.4rem', fontWeight: 900 }}>
                    {user.avatar}
                </div>
                {isWinner && <Crown size={32} style={{ position: 'absolute', top: '-15px', right: '-15px', color: '#FFD700', transform: 'rotate(15deg)' }} />}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1e293b' }}>{user.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>{user.points} XP</div>
            </div>
            <div style={{ width: '100%', height: height, background: isWinner ? 'linear-gradient(to bottom, #FFD70033, #FFD70005)' : '#f8fafc', border: `1px solid ${color}44`, borderRadius: '16px 16px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: '2rem', fontWeight: 900 }}>
                {user.rank}
            </div>
        </div>
    );
}
