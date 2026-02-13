'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SneakPeek = dynamic(() => import('../components/SneakPeek'), { ssr: true });
const Frameworks = dynamic(() => import('../components/Frameworks'), { ssr: true });
const ToolsSection = dynamic(() => import('../components/ToolsSection'), { ssr: true });
const Curriculum = dynamic(() => import('../components/Curriculum'), { ssr: true });
const Mentor = dynamic(() => import('../components/Mentor'), { ssr: true });
const SocialProof = dynamic(() => import('../components/SocialProof'), { ssr: true });
const FAQ = dynamic(() => import('../components/FAQ'), { ssr: true });
const Footer = dynamic(() => import('../components/Footer'), { ssr: true });
const BottomCTA = dynamic(() => import('../components/BottomCTA'), { ssr: true });

export default function Home() {
  const mainRef = useRef(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useEffect(() => {
    // GSAP Scroll Animations for Sections
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        // Skip the first section (Hero) to avoid conflict with its specific load animation
        if (index === 0) return;

        // Skip sections that might already handle their own heavy animations if needed
        // But applying a subtle reveal ensures consistency
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="smooth-scroll-wrapper" suppressHydrationWarning={true}>
      <Navbar />
      <Hero onFormSubmit={() => setIsFormSubmitted(true)} />
      <Benefits />
      <SneakPeek />
      <Frameworks />
      <ToolsSection />
      <Curriculum />
      <Mentor />
      <SocialProof />
      <FAQ />
      <Footer />
      <BottomCTA isFormSubmitted={isFormSubmitted} />
    </main>
  );
}
