import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cakeImage from '@/assets/birthday-cake.png';
import knifeImage from '@/assets/cake-knife.png';

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
        {/* Birthday Table Background */}
        <div className="w-96 h-32 bg-gradient-to-r from-secondary to-accent rounded-lg shadow-magical mb-4" />
        
        {/* Cake */}
        <motion.div
          className="relative z-10"
          animate={isCakeCut ? { 
            x: [-5, 5, -5, 5, 0],
            y: [-2, 2, -2, 2, 0] 
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={cakeImage} 
            alt="Birthday Cake" 
            className="w-64 h-64 object-contain mx-auto"
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
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                  initial={{ x: -100 }}
                  animate={{ x: 300 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </motion.div>
              
              {/* Confetti burst */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['hsl(320 85% 65%)', 'hsl(280 70% 75%)', 'hsl(45 95% 70%)'][i % 3],
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos(i * 18 * Math.PI / 180) * 100,
                      y: Math.sin(i * 18 * Math.PI / 180) * 100,
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
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
          className="text-center mt-8"
        >
          <div className="text-6xl mb-4">🎉 👏 🎊</div>
          <p className="text-2xl text-celebration font-bold">
            Perfect cut! Everyone's clapping! 
          </p>
        </motion.div>
      )}
    </div>
  );
};