import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    "The program focused on practical skills that could be applied directly at work. The structured approach made learning efficient and relevant.",
    "Each module addressed real workplace scenarios, making the learning immediately useful.",
    "The curriculum was well-organized and aligned with current industry expectations.",
    "The sessions helped clarify concepts that are often overlooked in day-to-day work.",
    "Hands-on exercises made it easier to translate learning into execution.",
    "The learning experience felt focused, purposeful, and relevant to professional growth.",
    "The program helped strengthen fundamentals while introducing practical tools.",
    "Clear explanations and structured content made complex topics easier to understand.",
    "The focus on application over theory made a noticeable difference.",
    "The program helped me approach work problems with more clarity and confidence.",
    "Each session was designed with practical outcomes in mind.",
    "The learning pace worked well alongside a full-time job.",
    "The content was relevant, modern, and aligned with real business needs.",
    "The program provided a clear roadmap for skill improvement.",
    "Learning felt efficient and well-structured, without unnecessary information.",
    "The program helped bridge gaps in my existing skill set.",
    "The sessions encouraged practical thinking and problem-solving.",
    "Real-world examples made the learning experience more relatable.",
    "The program supported consistent progress without overwhelming the workload.",
    "The focus on hands-on learning helped reinforce key concepts.",
    "The learning experience was aligned with real professional challenges.",
    "The structured format made it easier to stay consistent and focused.",
    "The program helped improve both technical understanding and execution.",
    "The content was directly applicable to current work responsibilities.",
    "Overall, the learning experience felt practical and outcome-driven.",
    "The program helped me align my skills with evolving industry requirements.",
    "Learning through real use cases made the concepts more actionable.",
    "The program provided clarity on how to apply skills in real projects.",
    "The curriculum was designed with current industry practices in mind.",
    "The learning experience supported measurable professional growth.",
    "The focus on practical outcomes made the program valuable.",
    "The sessions helped improve efficiency and decision-making at work.",
    "The program encouraged a more structured approach to problem-solving.",
    "The learning journey felt relevant to real-world business scenarios.",
    "The content helped refine skills needed for day-to-day professional tasks.",
    "The program provided insights that could be applied immediately.",
    "The learning approach was modern and aligned with workplace expectations.",
    "The sessions helped strengthen both conceptual understanding and application.",
    "The program supported steady skill development alongside professional responsibilities.",
    "The focus on execution made learning more impactful.",
    "The content helped bridge the gap between knowledge and application.",
    "The program emphasized skills that are relevant in real work environments.",
    "The learning experience improved confidence in handling professional challenges.",
    "The structure helped maintain consistency without disrupting work schedules.",
    "The program provided clarity on industry-aligned skill development.",
    "The sessions helped improve practical understanding of complex topics.",
    "The learning approach was efficient and well-paced for working professionals.",
    "The program helped enhance skills that directly impact work performance.",
    "The curriculum was focused on practical relevance rather than theory.",
    "Overall, the program delivered clear and measurable professional value."
];

const TestimonialsTicker = () => {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
            padding: '1.5rem 0',
            borderTop: '1px solid var(--border-color)',
            position: 'relative',
            marginTop: 'auto'
        }}>
            {/* Premium Gradient Fades */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '150px',
                height: '100%',
                background: 'linear-gradient(to right, var(--bg-secondary) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '100%',
                background: 'linear-gradient(to left, var(--bg-secondary) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            <motion.div
                style={{ display: 'flex', gap: '1.25rem', width: 'max-content' }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 400
                }}
                whileHover={{ animationPlayState: 'paused' }}
            >
                {[...testimonials, ...testimonials].map((text, index) => (
                    <motion.div
                        key={index}
                        whileHover={{
                            scale: 1.04,
                            y: -4,
                            borderColor: 'var(--accent-primary)',
                            boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                            backgroundColor: 'var(--bg-secondary)'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1.25rem',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            maxWidth: '340px',
                            flexShrink: 0,
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'border-color 0.3s ease, background-color 0.3s ease'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(255, 87, 34, 0.1)',
                            flexShrink: 0
                        }}>
                            <Star size={12} color="var(--accent-primary)" fill="var(--accent-primary)" />
                        </div>
                        <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.4',
                            fontWeight: 500,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontStyle: 'italic',
                            opacity: 0.85
                        }}>
                            "{text}"
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default TestimonialsTicker;
