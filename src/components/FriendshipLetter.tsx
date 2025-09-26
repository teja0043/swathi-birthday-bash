import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FriendshipLetterProps {
  onComplete: () => void;
}

export const FriendshipLetter = ({ onComplete }: FriendshipLetterProps) => {
  const [showLetter, setShowLetter] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const letterTimer = setTimeout(() => {
      setShowLetter(true);
    }, 1000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const letterContent = `Dear Swathi,

On your special day, I just want to remind you how lucky I am to have you as my friend.

You bring joy, laughter, and light into every moment we share, and life feels brighter with you in it.

May this birthday be as beautiful and special as you are, filled with endless happiness, surprises, and dreams coming true.

Here's to more memories, more laughter, and a lifetime of friendship.

Happy Birthday, Swathi! 🎂🎉💖`;

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-celebration mb-4">
          💌 A Message from the Heart 💌
        </h2>
      </motion.div>

      {showLetter && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="max-w-2xl w-full"
        >
          {/* Letter scroll background */}
          <div className="relative">
            <motion.div
              className="bg-gradient-to-br from-card to-secondary rounded-2xl shadow-magical p-8 md:p-12 border-2 border-accent/30 relative overflow-hidden"
              animate={{ 
                boxShadow: [
                  "0 20px 60px -10px hsl(320 85% 65% / 0.3)",
                  "0 20px 60px -10px hsl(45 95% 70% / 0.4)",
                  "0 20px 60px -10px hsl(320 85% 65% / 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-sparkle text-2xl animate-sparkle">✨</div>
              <div className="absolute top-4 right-4 text-celebration text-2xl animate-sparkle">💖</div>
              <div className="absolute bottom-4 left-4 text-magic text-2xl animate-sparkle">🌟</div>
              <div className="absolute bottom-4 right-4 text-accent text-2xl animate-sparkle">🎈</div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                className="relative z-10"
              >
                <pre className="font-serif text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-wrap text-center">
                  {letterContent}
                </pre>
              </motion.div>
              
              {/* Floating hearts */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-celebration text-xl"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      delay: Math.random() * 2,
                      repeat: Infinity,
                    }}
                  >
                    💕
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="bg-gradient-to-r from-celebration to-magic hover:from-magic hover:to-celebration text-white px-12 py-4 text-xl font-bold rounded-full shadow-magical button-celebration transform transition-all duration-300"
          >
            🎆 Continue to Finale 🎆
          </Button>
        </motion.div>
      )}

      {/* Background music indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-8 flex items-center space-x-2 text-muted-foreground"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-2xl"
        >
          🎵
        </motion.div>
        <span className="text-sm">Soft music playing...</span>
      </motion.div>
    </div>
  );
};