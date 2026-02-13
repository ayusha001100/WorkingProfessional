'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Mentor() {
  const mentors = [
    { id: 1, image: '/images/mentors/mentor-1.jpeg' },
    { id: 2, image: '/images/mentors/mentor-2.jpeg' },
    { id: 3, image: '/images/mentors/mentor-3.jpeg' },
    { id: 4, image: '/images/mentors/mentor-4.jpeg' },
    { id: 5, image: '/images/mentors/mentor-5.jpeg' },
    { id: 6, image: '/images/mentors/mentor-6.jpeg' },
    { id: 7, image: '/images/mentors/mentor-7.jpeg' },
    { id: 8, image: '/images/mentors/mentor-8.jpeg' },
    { id: 9, image: '/images/mentors/mentor-9.jpeg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-advance slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % mentors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mentors.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % mentors.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section className="mentor-section section-padding">
      <div className="container">
        <div className="mentor-layout">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="mentor-image-container"
          >
            <div className="mentor-slider-box">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  className="mentor-slide"
                >
                  <div className="mentor-image-wrapper">
                    <img
                      src={mentors[currentIndex].image}
                      alt={`Mentor ${currentIndex + 1}`}
                      className="mentor-img"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
                <ChevronLeft size={24} />
              </button>
              <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next">
                <ChevronRight size={24} />
              </button>

              <div className="experience-badge">Top 1% Mentors</div>
            </div>
          </motion.div>

          <div className="mentor-info">
            <span className="subtitle">Learn from Industry Leaders</span>
            <h2>Get Coached by <span className="text-secondary">Experts</span></h2>
            <p className="mentor-desc">
              At LetsUpgrade, we believe in learning by doing. Our mentors are professionals working at top-tier tech companies like Google, Amazon, and Uber, bringing real-world experience directly to you.
            </p>

            <div className="mentor-stats">
              <div className="stat-item">
                <span className="stat-number">75+</span>
                <span className="stat-label">Expert Mentors</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10M+</span>
                <span className="stat-label">Passionate Learners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.8/5</span>
                <span className="stat-label">Learning Quality</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      <style jsx>{`
        .mentor-section {
          background-color: white;
          overflow: hidden;
          padding: 80px 0;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .mentor-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .mentor-slider-box {
          position: relative;
          background: #f8fafc;
          padding: 0;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          height: 500px;
          overflow: hidden;
          width: 100%;
          transition: all 0.4s ease;
        }
        .mentor-slider-box:hover {
          box-shadow: 0 20px 50px rgba(255, 204, 0, 0.3), 0 10px 20px rgba(0,0,0,0.1);
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .mentor-slide {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .mentor-image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 0;
          overflow: hidden;
        }
        .mentor-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          color: #111;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
          opacity: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .prev-btn {
          left: 20px;
        }
        .next-btn {
          right: 20px;
        }
        .nav-btn:hover {
          background: var(--primary);
          color: black;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .experience-badge {
          position: absolute;
          bottom: 30px;
          right: 30px;
          left: auto;
          transform: none;
          background: var(--primary);
          color: #000;
          padding: 10px 20px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 0.8rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          z-index: 2;
          white-space: nowrap;
        }
        .subtitle {
          color: var(--primary);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
          display: block;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }
        h2 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 32px;
          color: #111;
          letter-spacing: -2px;
        }
        .text-secondary {
          color: var(--primary);
        }
        .mentor-desc {
          font-size: 1.3rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 48px;
        }
        .mentor-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
          border-top: 1px solid #eee;
          padding-top: 48px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--black);
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-label {
          color: #888;
          font-size: 1rem;
          font-weight: 600;
        }
        @media (max-width: 992px) {
          .mentor-layout {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          h2 {
            font-size: 3rem;
          }
          .mentor-slider-box {
            height: 450px;
          }
          .mentor-image-wrapper {
             max-width: none;
             height: 100%;
          }
        }
        @media (max-width: 576px) {
          .mentor-slider-box {
            height: 400px;
          }
          .experience-badge {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </section>
  );
}

