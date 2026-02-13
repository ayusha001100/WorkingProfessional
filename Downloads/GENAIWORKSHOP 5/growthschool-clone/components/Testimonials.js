'use client';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const learners = [
    { id: 1, company: 'GOOGLE', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, company: 'META', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, company: 'STRIPE', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, company: 'AMAZON', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, company: 'MICROSOFT', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 6, company: 'META', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 7, company: 'GOOGLE', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 8, company: 'STRIPE', avatar: 'https://i.pravatar.cc/150?img=20' },
    { id: 9, company: 'AMAZON', avatar: 'https://i.pravatar.cc/150?img=25' },
    { id: 10, company: 'GOOGLE', avatar: 'https://i.pravatar.cc/150?img=30' },
    { id: 11, company: 'MICROSOFT', avatar: 'https://i.pravatar.cc/150?img=35' },
    { id: 12, company: 'META', avatar: 'https://i.pravatar.cc/150?img=40' },
];

function Counter({ from = 0, to = 10000000 }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => {
        const millions = Math.round(latest / 1000000);
        return millions;
    });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, {
                duration: 1.2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, count, to]);

    return (
        <motion.span ref={ref}>
            {rounded}
        </motion.span>
    );
}

export default function Testimonials() {
    // Duplicate the array twice for seamless infinite loop
    const duplicatedLearners = [...learners, ...learners];

    return (
        <section className={styles.testimonialsSection}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={styles.container}
            >
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <Counter from={0} to={10000000} />M+ Learners
                    </h2>
                    <p className={styles.subtitle}>have reaped benefits from our programs</p>
                </div>

                <div className={styles.carouselContainer}>
                    <div className={styles.carouselTrack}>
                        {duplicatedLearners.map((learner, index) => (
                            <div
                                key={`${learner.id}-${index}`}
                                className={styles.card}
                            >
                                <div className={styles.companyBadge}>
                                    <span className={styles.companyName}>{learner.company}</span>
                                </div>
                                <div className={styles.avatarWrapper}>
                                    <img
                                        src={learner.avatar}
                                        alt={`Learner at ${learner.company}`}
                                        className={styles.avatar}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Mobile View */}
            <div className={styles.mobileView}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <Counter from={0} to={10000000} />M+ Learners
                    </h2>
                    <p className={styles.subtitle}>have reaped benefits from our programs</p>
                </div>
                <div className={styles.mobileCards}>
                    {learners.slice(0, 6).map((learner, index) => (
                        <motion.div
                            key={learner.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={styles.card}
                        >
                            <div className={styles.companyBadge}>
                                <span className={styles.companyName}>{learner.company}</span>
                            </div>
                            <div className={styles.avatarWrapper}>
                                <img
                                    src={learner.avatar}
                                    alt={`Learner at ${learner.company}`}
                                    className={styles.avatar}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
