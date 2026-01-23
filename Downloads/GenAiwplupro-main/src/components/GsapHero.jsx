import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, BrainCircuit, Rocket, ChevronRight, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GsapHero() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const component = useRef(null);
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const btnContainerRef = useRef(null);
    const [outcomeIndex, setOutcomeIndex] = useState(0);
    const outcomes = ["PROMOTION", "ROLE SWITCH", "CTC JUMP"];

    useEffect(() => {
        const interval = setInterval(() => {
            setOutcomeIndex((prev) => (prev + 1) % outcomes.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, delay: 0.5 })
                .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.8")
                .from(btnContainerRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

            // Particle effect in background
            gsap.to(".hero-particle", {
                y: "random(-100, 100)",
                x: "random(-100, 100)",
                rotation: "random(-360, 360)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "none"
            });
        }, component);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={component} style={{
            position: 'relative', minHeight: '100vh', width: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 5%', overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'var(--accent-secondary)', opacity: 0.05, filter: 'blur(120px)', borderRadius: '50%' }} />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <div key={i} className="hero-particle" style={{
                    position: 'absolute',
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    background: i % 2 === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    opacity: 0.4
                }} />
            ))}

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1.2rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '50px', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}
                >
                    <Sparkles size={16} color="var(--accent-primary)" />
                    <span>The Future of Professional Upskilling</span>
                </motion.div>

                <h1 ref={titleRef} style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)', lineHeight: '0.95', marginBottom: '1.5rem', fontWeight: 800 }}>
                    UPGRADE YOUR <br />
                    <span style={{
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        {outcomes[outcomeIndex]}
                    </span>
                </h1>

                <p ref={subRef} style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
                    Stop guessing. Start building. A mentor-driven platform that understands your career journey and helps you master Gen AI for the real world.
                </p>

                <div ref={btnContainerRef} style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/login')} className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                        Get Career Profiled <ArrowRight size={22} />
                    </button>
                    <button className="btn-secondary" style={{ padding: '1.2rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={14} fill="#fff" />
                        </div>
                        Watch Demo
                    </button>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.5 }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll to Explore</div>
                <div style={{ width: '2px', height: '50px', background: 'linear-gradient(to bottom, var(--accent-primary), transparent)' }} />
            </div>
        </div>
    );
}
