'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BottomCTA.module.css';
import Link from 'next/link';

export default function BottomCTA({ isFormSubmitted }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Make sure it's visible on mount
        setIsVisible(true);
    }, []);

    if (isFormSubmitted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.fixedWrapper}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Link href="https://pro.letsupgrade.in" target="_blank" rel="noopener noreferrer" className={styles.ctaContainer} style={{ textDecoration: 'none' }}>
                        <div className={styles.ctaContent}>
                            <span className={styles.ctaText}>ENROLL NOW</span>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
