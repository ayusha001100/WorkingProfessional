import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Trophy, Medal, Crown, TrendingUp, Flame, Star, Target, MapPin, Globe, Building, ArrowRight, TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

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
        if (!userData) return;

        const city = userData?.location?.city || userData?.onboarding?.city || 'Mumbai';
        const state = userData?.location?.state || userData?.onboarding?.state || 'Maharashtra';
        const country = userData?.location?.country || 'India';

        // Listen to top 100 users globally by XP
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('progress.xp', 'desc'), limit(100));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allUsers = [];
            snapshot.forEach((doc) => {
                const d = doc.data();
                allUsers.push({
                    id: doc.id,
                    name: d.name || d.displayName || 'Anonymous',
                    points: d.progress?.xp || 0,
                    role: d.onboarding?.dreamRole || d.profile?.currentRole || 'Learner',
                    avatar: (d.name || d.displayName || 'U')[0].toUpperCase(),
                    isMe: doc.id === user?.uid,
                    city: d.location?.city || d.onboarding?.city,
                    state: d.location?.state || d.onboarding?.state,
                    country: d.location?.country,
                    privacy: d.preferences?.privacy?.showOnLeaderboard ?? true
                });
            });

            // Filter out private profiles if needed, but keeping current user visible to themselves
            const visibleUsers = allUsers.filter(u => u.privacy || u.isMe);

            // Process lists for each view
            // Note: In a real app with millions of users, we would do this query server-side or with specific indexes

            const filterAndRank = (list, filterFn) => {
                let filtered = list.filter(filterFn);
                // Ensure current user is in the list (rank might be estimated if not in top 100)
                const meInList = filtered.find(u => u.isMe);
                if (!meInList && user) {
                    // If user is not in top 100, add them at the bottom just for display (mock rank)
                    // In real app, we'd query for user's specific rank
                    filtered.push({
                        id: user.uid,
                        name: userData.name || 'You',
                        points: userData.progress?.xp || 0,
                        role: userData.onboarding?.dreamRole || 'Learner',
                        avatar: (userData.name || 'Y')[0],
                        isMe: true,
                        rank: '>100'
                    });
                }

                // Sort again just to be sure
                filtered.sort((a, b) => b.points - a.points);

                // Assign ranks
                filtered = filtered.map((u, i) => ({ ...u, rank: i + 1 }));

                // Find my index to create "My Zone"
                const myIndex = filtered.findIndex(u => u.isMe);
                let myZone = [];
                if (myIndex !== -1) {
                    const start = Math.max(0, myIndex - 2);
                    const end = Math.min(filtered.length, myIndex + 3);
                    myZone = filtered.slice(start, end);
                }

                return {
                    list: filtered,
                    myZone
                };
            };

            const cityData = filterAndRank(visibleUsers, u => !u.city || u.city === city || u.isMe); // Loose filtering for demo
            const stateData = filterAndRank(visibleUsers, u => !u.state || u.state === state || u.isMe);
            const countryData = filterAndRank(visibleUsers, u => true); // Global

            setLeaderboardData({
                city: {
                    location: city,
                    topThree: cityData.list.slice(0, 3),
                    others: cityData.list.slice(3),
                    myZone: cityData.myZone
                },
                state: {
                    location: state,
                    topThree: stateData.list.slice(0, 3),
                    others: stateData.list.slice(3),
                    myZone: stateData.myZone
                },
                country: {
                    location: country,
                    topThree: countryData.list.slice(0, 3),
                    others: countryData.list.slice(3),
                    myZone: countryData.myZone
                }
            });
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, userData]);

    const currentData = leaderboardData[view];
    if (loading) return <DashboardLayout><div className="flex h-screen items-center justify-center text-white">Loading Leaderboard...</div></DashboardLayout>;

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
                            <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: 0 }}>
                                {currentData.myZone[0] && currentData.myZone[0].points > (userData?.progress?.xp || 0)
                                    ? `You are ${currentData.myZone[0].points - (userData?.progress?.xp || 0)} XP away from Rank #1`
                                    : 'You are leading the charts!'}
                            </p>
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
                {view === 'city' && currentData.topThree.length >= 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2rem', marginBottom: '5rem' }}>
                        {currentData.topThree[1] && <PodiumItem user={currentData.topThree[1]} height="140px" color="#94a3b8" />}
                        {currentData.topThree[0] && <PodiumItem user={currentData.topThree[0]} height="200px" color="#FFD700" isWinner />}
                        {currentData.topThree[2] && <PodiumItem user={currentData.topThree[2]} height="110px" color="#b45309" />}
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
