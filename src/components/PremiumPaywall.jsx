import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Zap, Sparkles, X } from 'lucide-react';

export default function PremiumPaywall({ isOpen, onClose, module, price = 29900, onPayment }) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            console.log('PremiumPaywall opened:', { module: module?.title, price, hasOnPayment: !!onPayment });
        }
    }, [isOpen, module, price, onPayment]);

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        // Ensure overlay covers header (z-index 90)
                        pointerEvents: 'auto'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        style={{
                            background: '#fff',
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            position: 'relative',
                            zIndex: 1001,
                            // Prevent click from closing when clicking modal content
                            pointerEvents: 'auto'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#f1f5f9',
                                border: 'none',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{
                            background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                            color: '#fff'
                        }}>
                            <div style={{
                                background: '#FF5722',
                                width: '60px',
                                height: '60px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                boxShadow: '0 0 30px rgba(255, 87, 34, 0.4)'
                            }}>
                                <Shield size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
                                Unlock Full Access
                            </h2>
                            <p style={{ opacity: 0.8, fontSize: '1rem', fontWeight: 500 }}>
                                Unlock Level 3+ and continue your AI transformation
                            </p>
                        </div>

                        <div style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                                {[
                                    "Access to all 12 Gen AI Submodules",
                                    "Domain-specific AI roadmaps",
                                    "Professional Certification & NFTs",
                                    "Priority Job Board placement",
                                    "Live Weekly AI Strategy sessions"
                                ].map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ color: '#10b981' }}>
                                            <Check size={20} />
                                        </div>
                                        <span style={{ fontWeight: 600, color: '#475569' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {price && (
                                    <div style={{
                                        textAlign: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{
                                            fontSize: '2.5rem',
                                            fontWeight: 900,
                                            color: '#1a1a1a',
                                            lineHeight: 1
                                        }}>
                                            ₹{price.toLocaleString('en-IN')}
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: '#64748b',
                                            marginTop: '0.25rem'
                                        }}>
                                            One-time payment
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        window.location.href = "https://pages.razorpay.com/pl_S7Hmm9y3KCV723/view";
                                        if (onPayment) onPayment();
                                    }}
                                    style={{
                                        background: '#FF5722',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '1.2rem',
                                        borderRadius: '16px',
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        boxShadow: '0 10px 20px rgba(255, 87, 34, 0.2)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#ff6b3d';
                                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 87, 34, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#FF5722';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 87, 34, 0.2)';
                                    }}
                                >
                                    Pay with Razorpay <Sparkles size={18} />
                                </button>
                                <span style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                                    Trusted by researchers at OpenAI, Meta, and Google
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Render via portal to document.body to ensure proper stacking
    return isOpen ? createPortal(modalContent, document.body) : null;
}
