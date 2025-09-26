import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Fireworks } from './Fireworks';
import { Balloons } from './Balloons';

export const GrandFinale = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-4 overflow-hidden">
      {/* Background Effects */}
      <Fireworks />
      <Balloons />
      
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 4,
              repeat: Infinity,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "backOut" }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8"
          animate={{
            background: [
              "linear-gradient(45deg, hsl(320 85% 65%), hsl(280 70% 75%))",
              "linear-gradient(45deg, hsl(280 70% 75%), hsl(45 95% 70%))",
              "linear-gradient(45deg, hsl(45 95% 70%), hsl(350 80% 70%))",
              "linear-gradient(45deg, hsl(350 80% 70%), hsl(320 85% 65%))",
            ],
            transition: { duration: 3, repeat: Infinity }
          }}
          style={{ 
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          🎆 GRAND FINALE 🎆
        </motion.h1>

        <motion.div
          className="text-6xl mb-8 animate-bounce"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          🎊 🎂 🎁 ✨
        </motion.div>
      </motion.div>

      {showMessage && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="text-center relative z-10 max-w-4xl"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-celebration"
            animate={{
              textShadow: [
                "0 0 20px hsl(320 85% 65%)",
                "0 0 30px hsl(45 95% 70%)",
                "0 0 20px hsl(320 85% 65%)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Wishing you the happiest birthday ever, Swathi!
          </motion.h2>
          
          <motion.div
            className="text-6xl md:text-8xl mb-8"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            🎉🎂🎁✨
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-magic font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            May your special day be filled with love, laughter, and all your favorite things! 💖
          </motion.p>

          {/* Floating celebration elements */}
          <div className="absolute inset-0 pointer-events-none">
            {['🎈', '🎊', '🌟', '💫', '🎀', '💖'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Final sparkle shower */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sparkle text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
            }}
            animate={{
              y: '110vh',
              rotate: 720,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};