import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Sparkles } from './Sparkles';
import { Balloons } from './Balloons';

interface CelebrationAnimationProps {
  onComplete: () => void;
}

export const CelebrationAnimation = ({ onComplete }: CelebrationAnimationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
      <Sparkles />
      <Balloons />
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "backOut" }}
        className="relative z-10"
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
            transition: { duration: 2, repeat: Infinity }
          }}
          style={{ 
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Happy Birthday Swathi! 🎉
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl md:text-3xl text-magic animate-float"
        >
          ✨ Let the celebration begin! ✨
        </motion.div>
      </motion.div>
    </div>
  );
};