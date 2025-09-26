import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Confetti } from './Confetti';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "backOut" }}
        className="mb-8"
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-celebration to-accent bg-clip-text text-transparent mb-4">
          Happy Birthday
        </h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-magic mb-6"
        >
          Swathi 🎉🎂✨
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Button
          onClick={onStart}
          size="lg"
          className="text-2xl px-12 py-6 bg-gradient-to-r from-primary to-celebration hover:from-celebration hover:to-primary button-magical transform transition-all duration-300 shadow-magical animate-bounce"
        >
          🎊 Start the Celebration! 🎊
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 text-muted-foreground"
      >
        <p className="text-lg">Get ready for a magical birthday journey...</p>
      </motion.div>
    </div>
  );
};