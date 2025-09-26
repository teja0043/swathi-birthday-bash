import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingPage } from './LandingPage';
import { CelebrationAnimation } from './CelebrationAnimation';
import { CakeCuttingSection } from './CakeCuttingSection';
import { GiftBoxSurprise } from './GiftBoxSurprise';
import { FriendshipLetter } from './FriendshipLetter';
import { GrandFinale } from './GrandFinale';

type Step = 'landing' | 'celebration' | 'cake' | 'gift' | 'letter' | 'finale';

export const BirthdayExperience = () => {
  const [currentStep, setCurrentStep] = useState<Step>('landing');

  const nextStep = () => {
    const steps: Step[] = ['landing', 'celebration', 'cake', 'gift', 'letter', 'finale'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage onStart={nextStep} />;
      case 'celebration':
        return <CelebrationAnimation onComplete={nextStep} />;
      case 'cake':
        return <CakeCuttingSection onCakeCut={nextStep} />;
      case 'gift':
        return <GiftBoxSurprise onGiftOpened={nextStep} />;
      case 'letter':
        return <FriendshipLetter onComplete={nextStep} />;
      case 'finale':
        return <GrandFinale />;
      default:
        return <LandingPage onStart={nextStep} />;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-background to-secondary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};