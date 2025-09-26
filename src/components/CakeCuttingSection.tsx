import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cakeImage from '@/assets/birthday-cake.png';
import knifeImage from '@/assets/cake-knife.png';
import peopleClappingImage from '@/assets/people-clapping.png';

interface CakeCuttingSectionProps {
  onCakeCut: () => void;
}

export const CakeCuttingSection = ({ onCakeCut }: CakeCuttingSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [showKnife, setShowKnife] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowKnife(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cakeRef.current && !isCakeCut) {
      const rect = cakeRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCakeClick = () => {
    if (!isCakeCut) {
      setIsCakeCut(true);
      
      // Play cutting sound effect (placeholder for now)
      // In a real app, you'd use the use-sound hook here
      
      // Transition to next step after animation
      setTimeout(() => {
        onCakeCut();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          🎂 Time to Cut the Cake! 🎂
        </h2>
        <p className="text-xl text-muted-foreground">
          {showKnife && !isCakeCut ? 'Move your mouse over the cake and click to cut it!' : 'Get ready...'}
        </p>
      </motion.div>

      <motion.div
        ref={cakeRef}
        className="relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleCakeClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
      >
        {/* Festive Party Scene */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Party background with decorations */}
          <motion.div 
            className="w-full h-64 bg-gradient-to-br from-celebration via-secondary to-accent rounded-3xl shadow-celebration relative overflow-hidden mb-8"
            animate={{ 
              boxShadow: [
                "0 25px 50px -12px hsl(350 80% 70% / 0.4)",
                "0 25px 50px -12px hsl(320 85% 65% / 0.4)",
                "0 25px 50px -12px hsl(350 80% 70% / 0.4)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Floating party decorations */}
            <div className="absolute inset-0 pointer-events-none">
              {['🎈', '🎊', '🌟', '💫', '🎀'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${15 + i * 20}%`,
                    top: `${20 + Math.sin(i) * 10}%`,
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            
            {/* Sparkling border effect */}
            <motion.div 
              className="absolute inset-0 rounded-3xl border-4 border-sparkle/30"
              animate={{
                borderColor: [
                  "hsl(50 100% 80% / 0.3)",
                  "hsl(45 95% 70% / 0.6)",
                  "hsl(50 100% 80% / 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
        
        {/* Cake */}
        <motion.div
          className="relative z-10 -mt-32"
          animate={isCakeCut ? { 
            x: [-5, 5, -5, 5, 0],
            y: [-2, 2, -2, 2, 0] 
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src={cakeImage} 
            alt="Birthday Cake" 
            className="w-64 h-64 object-contain mx-auto relative z-20 animate-glow-pulse"
            animate={{
              filter: [
                "drop-shadow(0 0 20px hsl(45 95% 70% / 0.6))",
                "drop-shadow(0 0 40px hsl(320 85% 65% / 0.8))",
                "drop-shadow(0 0 20px hsl(45 95% 70% / 0.6))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Cake Split Animation */}
          {isCakeCut && (
            <>
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-sparkle to-transparent opacity-80"
                  initial={{ x: -100 }}
                  animate={{ x: 300 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.div>
              
              {/* Enhanced confetti burst */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['hsl(320 85% 65%)', 'hsl(280 70% 75%)', 'hsl(45 95% 70%)', 'hsl(350 80% 70%)'][i % 4],
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos(i * 12 * Math.PI / 180) * (80 + Math.random() * 40),
                      y: Math.sin(i * 12 * Math.PI / 180) * (80 + Math.random() * 40),
                    }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Knife that follows mouse */}
        {showKnife && !isCakeCut && (
          <motion.img
            src={knifeImage}
            alt="Cake Knife"
            className="absolute w-16 h-16 object-contain pointer-events-none z-20"
            style={{
              left: mousePosition.x - 32,
              top: mousePosition.y - 32,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {isCakeCut && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8 relative"
        >
          {/* People clapping image */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-6"
          >
            <motion.img
              src={peopleClappingImage}
              alt="Friends clapping and cheering"
              className="w-96 h-48 object-cover rounded-2xl mx-auto shadow-celebration"
              animate={{
                boxShadow: [
                  "0 25px 50px -12px hsl(350 80% 70% / 0.4)",
                  "0 25px 50px -12px hsl(320 85% 65% / 0.6)",
                  "0 25px 50px -12px hsl(350 80% 70% / 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🎉 👏 🎊
          </motion.div>
          
          <motion.p
            className="text-2xl text-celebration font-bold"
            animate={{
              textShadow: [
                "0 0 10px hsl(350 80% 70% / 0.5)",
                "0 0 20px hsl(350 80% 70% / 0.8)",
                "0 0 10px hsl(350 80% 70% / 0.5)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Perfect cut! Everyone's clapping and cheering! 
          </motion.p>
          
          {/* Cheering sound indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute top-4 right-4 flex items-center space-x-2 text-celebration"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-2xl"
            >
              🔊
            </motion.div>
            <span className="text-sm font-medium">Cheering sounds!</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};