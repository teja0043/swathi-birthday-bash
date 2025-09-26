import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

export const Fireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = ['hsl(320 85% 65%)', 'hsl(280 70% 75%)', 'hsl(45 95% 70%)', 'hsl(350 80% 70%)', 'hsl(260 85% 75%)'];
    const pieces: Firework[] = [];

    for (let i = 0; i < 10; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4,
      });
    }

    setFireworks(pieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Firework explosion */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-8 rounded-full"
              style={{
                backgroundColor: firework.color,
                transformOrigin: 'bottom center',
                transform: `rotate(${i * 30}deg)`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: firework.delay,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}
          
          {/* Center burst */}
          <motion.div
            className="absolute w-4 h-4 rounded-full -translate-x-2 -translate-y-2"
            style={{ backgroundColor: firework.color }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              delay: firework.delay,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </div>
      ))}
    </div>
  );
};