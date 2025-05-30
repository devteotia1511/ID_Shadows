import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { useInView } from 'react-intersection-observer';

const App = () => {
  const typedRef = useRef(null);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Protect Your Digital Identity in the Shadows'],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative h-screen flex items-center justify-center bg-soft-gray"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span ref={typedRef}></span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-powered cybersecurity platform to detect phishing threats, scan the dark web, and guard your personal data.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-neon-blue text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-glow"
            >
              Start Free Scan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-signal-purple text-white px-8 py-3 rounded-lg font-semibold"
            >
              Contact Sales
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Feature Grid Section - Placeholder for now */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Comprehensive Security Features
          </h2>
          {/* Feature grid will be added in the next iteration */}
        </div>
      </section>
    </div>
  );
};

export default App;