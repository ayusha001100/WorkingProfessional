import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Newspaper, Sparkles, TrendingUp, ExternalLink, Bookmark, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
export default function NewsPage() {
    const [news, setNews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [lastUpdated, setLastUpdated] = React.useState(null);

    const [activeCategory, setActiveCategory] = React.useState('Trending');

    // Function to simulate fetching live news data relative to current time
    const fetchNews = React.useCallback(async (category = 'Trending', isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            // In a real app, this would be: fetch(`https://newsapi.org/v2/everything?q=${category}+AI&apiKey=YOUR_KEY`)
            // Generating dynamic "fresh" news based on current time
            const timeNow = new Date();
            const timeAgo = (min) => {
                const d = new Date(timeNow.getTime() - min * 60000);
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            const allNews = [
                {
                    id: 'n1',
                    title: "OpenAI Announces GPT-5 Pre-training",
                    category: "Trending",
                    tags: ["Startups", "LLM"],
                    source: "TechCrunch",
                    time: timeAgo(15), // 15 mins ago
                    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=800",
                    whyItMatters: "Next-gen models will likely redefine prompt engineering standards. Prepare for multi-modal native reasoning.",
                    url: "https://techcrunch.com"
                },
                {
                    id: 'n2',
                    title: "Google DeepMind's New Robotics Breakthrough",
                    category: "Trending",
                    tags: ["Research", "Robotics"],
                    source: "The Verge",
                    time: timeAgo(45),
                    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
                    whyItMatters: "General purpose robots are closer than we thought. Impact on physical labor automation is imminent.",
                    url: "https://theverge.com"
                },
                {
                    id: 'n3',
                    title: "Anthropic Releases Claude 3.5 Opus",
                    category: "Personalized", // Assuming user likes LLMs
                    tags: ["LLM", "Investment"],
                    source: "Anthropic Blog",
                    time: "2 hours ago",
                    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
                    whyItMatters: "Top-tier reasoning capabilities now available at lower latency. Excellent for complex coding tasks.",
                    url: "https://anthropic.com"
                },
                {
                    id: 'n4',
                    title: "AI Startup 'Cognition' Raises $200M",
                    category: "Investment",
                    tags: ["Startups", "Investment"],
                    source: "Bloomberg",
                    time: "4 hours ago",
                    image: "https://images.unsplash.com/photo-1559136555-930d72f18615?w=800",
                    whyItMatters: "Agentic AI is the new VC darling. Expect a flood of autonomous coding tools in 2026.",
                    url: "https://bloomberg.com"
                },
                {
                    id: 'n5',
                    title: "Meta Open Sources Llama 4 70B",
                    category: "Trending",
                    tags: ["Personalized", "LLM"],
                    source: "Meta AI",
                    time: "5 hours ago",
                    image: "https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?w=800",
                    whyItMatters: "Open weights state-of-the-art models enable private, local deployments for enterprise data.",
                    url: "https://ai.meta.com"
                },
                {
                    id: 'n6',
                    title: "Y Combinator's W26 Batch is 80% AI",
                    category: "Startups",
                    tags: ["Startups", "Trending"],
                    source: "Y Combinator",
                    time: "1 day ago",
                    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
                    whyItMatters: "The startup ecosystem has fully pivoted. Niche vertical AI agents are the current heavy trend.",
                    url: "https://ycombinator.com"
                }
            ];

            // Filter logic
            const filtered = category === 'Trending'
                ? allNews
                : allNews.filter(n => n.category === category || n.tags.includes(category));

            setNews(filtered);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Failed to fetch news", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    React.useEffect(() => {
        fetchNews(activeCategory);
        // Auto-refresh every 2 minutes
        const interval = setInterval(() => fetchNews(activeCategory, true), 120000);
        return () => clearInterval(interval);
    }, [fetchNews, activeCategory]);

    if (loading && !refreshing && news.length === 0) return <DashboardLayout><div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading latest updates...</div></DashboardLayout>;

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
                <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>AI Career News</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Personalized news feed. No noise, just what affects your career progression.</p>
                        {lastUpdated && (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <RefreshCw size={12} /> Last updated: {lastUpdated.toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => fetchNews(activeCategory, true)}
                        disabled={refreshing}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.8rem 1.4rem',
                            borderRadius: '14px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            fontWeight: 700,
                            cursor: refreshing ? 'not-allowed' : 'pointer',
                            opacity: refreshing ? 0.7 : 1,
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                    >
                        <RefreshCw size={18} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                        {refreshing ? 'Refreshing...' : 'Refresh Feed'}
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                    {['Trending', 'Personalized', 'Startups', 'Investment'].map(cat => (
                        <Tab
                            key={cat}
                            active={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </Tab>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {news.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                            transition={{ duration: 0.2 }}
                            className="glass-card"
                            style={{
                                padding: '0',
                                overflow: 'hidden',
                                display: 'grid',
                                gridTemplateColumns: 'minmax(280px, 320px) 1fr',
                                borderRadius: '24px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-card)'
                            }}
                        >
                            <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={item.image}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
                                    }}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                />
                                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {item.source}
                                </div>
                            </div>
                            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff5722', background: 'rgba(255, 87, 34, 0.1)', padding: '0.4rem 1rem', borderRadius: '50px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{item.category}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.time}</span>
                                    </div>
                                    <Bookmark size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} />
                                </div>

                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.25, color: 'var(--text-primary)' }}>{item.title}</h3>

                                <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', color: '#ff5722' }}>
                                        <Sparkles size={16} fill="#ff5722" />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why this matters to you</span>
                                    </div>
                                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{item.whyItMatters}</p>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => window.open(item.url, '_blank')}
                                        style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem', padding: '0.5rem 0' }}
                                    >
                                        Read Full Article <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {news.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No news found for this category.</p>
                            <button onClick={() => setActiveCategory('Trending')} style={{ marginTop: '1rem', color: '#ff5722', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }}>View Trending News</button>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

function Tab({ children, active = false, onClick }) {
    return (
        <span
            onClick={onClick}
            style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: active ? '#ff5722' : 'var(--text-secondary)',
                padding: '0.8rem 1.6rem',
                borderRadius: '14px',
                background: active ? 'rgba(255, 87, 34, 0.1)' : 'transparent',
                border: active ? '1px solid #ff5722' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
            }}>
            {children}
        </span>
    );
}
