import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export const Balloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const balloonEmojis = ['🎈', '🎀', '🎊', '🌟', '💖'];
    const pieces: Balloon[] = [];

    for (let i = 0; i < 25; i++) {
      pieces.push({
        id: i,
        emoji: balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      });
    }

    setBalloons(pieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute text-4xl"
          style={{
            left: `${balloon.x}%`,
            filter: `drop-shadow(0 0 8px hsl(320 85% 65% / 0.4))`,
          }}
          initial={{ y: window.innerHeight + 50, rotate: 0 }}
          animate={{
            y: -100,
            rotate: [0, 360, 720],
            x: [0, 30, -30, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {balloon.emoji}
        </motion.div>
      ))}
    </div>
  );
};