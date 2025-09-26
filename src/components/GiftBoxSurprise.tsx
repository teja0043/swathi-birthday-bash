import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import giftBoxImage from '@/assets/gift-box.png';

interface GiftBoxSurpriseProps {
  onGiftOpened: () => void;
}

export const GiftBoxSurprise = ({ onGiftOpened }: GiftBoxSurpriseProps) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleUnwrap = () => {
    setIsUnwrapped(true);
  };

  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => {
      onGiftOpened();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-magic mb-4">
          🎁 A Special Gift for You! 🎁
        </h2>
        <p className="text-xl text-muted-foreground">
          {!isUnwrapped ? 'Click the gift to unwrap it!' : !isOpened ? 'Now open it!' : 'Something magical is happening...'}
        </p>
      </motion.div>

      {/* Gift Table */}
      <div className="relative">
        <div className="w-96 h-32 bg-gradient-to-r from-accent to-sparkle rounded-lg shadow-magical mb-4" />
        
        <motion.div
          className="relative z-10 cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
        >
          {!isUnwrapped ? (
            <motion.img
              src={giftBoxImage}
              alt="Gift Box"
              className="w-48 h-48 object-contain mx-auto hover:scale-110 transition-transform duration-300"
              onClick={handleUnwrap}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ) : (
            <motion.div 
              className="w-48 h-48 mx-auto relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Unwrapped gift box */}
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-sparkle to-accent rounded-lg relative overflow-hidden"
                animate={isOpened ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.8 }}
              >
                {/* Gift box glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Lid */}
                <motion.div
                  className="absolute -top-2 -left-2 w-36 h-8 bg-gradient-to-r from-celebration to-primary rounded-lg shadow-lg"
                  animate={isOpened ? { 
                    rotateX: -90,
                    y: -20,
                    z: 20 
                  } : {}}
                  transition={{ duration: 1, ease: "backOut" }}
                  style={{ transformOrigin: "bottom center" }}
                />
                
                {/* Sparkle effects when opened */}
                {isOpened && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-sparkle text-2xl"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos(i * 24 * Math.PI / 180) * 80,
                          y: Math.sin(i * 24 * Math.PI / 180) * 80,
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: 0.2,
                          ease: "easeOut"
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
              
              {!isOpened && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-16"
                >
                  <Button
                    onClick={handleOpen}
                    className="bg-gradient-to-r from-magic to-celebration hover:from-celebration hover:to-magic text-white px-8 py-3 text-lg font-bold rounded-full shadow-magical transform hover:scale-110 transition-all duration-300"
                  >
                    ✨ Open Gift ✨
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Unwrapping animation effects */}
        {isUnwrapped && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Wrapping paper pieces */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 20}%`,
                }}
                initial={{ scale: 1, rotate: 0, opacity: 1 }}
                animate={{
                  scale: 0,
                  rotate: 360,
                  opacity: 0,
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                }}
                transition={{ duration: 1, delay: 0.1 * i }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};