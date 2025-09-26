import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

export const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(320 85% 65%)', 
      'hsl(280 70% 75%)', 
      'hsl(45 95% 70%)', 
      'hsl(350 80% 70%)', 
      'hsl(260 85% 75%)',
      'hsl(50 100% 80%)',
      'hsl(300 80% 70%)'
    ];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 80; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 4,
        size: Math.random() * 8 + 3,
      });
    }

    setConfetti(pieces);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            filter: `drop-shadow(0 0 6px ${piece.color})`,
          }}
          initial={{ y: -10, rotate: 0 }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 720 + Math.random() * 360,
            x: [0, Math.sin(piece.id) * 50, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};