"use client";

import { useState, useEffect } from 'react';
import BirthdayContent from '@/components/birthday-content';
import Countdown from '@/components/countdown';
import { EnvelopeIcon } from '@/components/icons';

export default function Home() {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    const target = new Date(today.getFullYear(), 5, 22); // June 22nd of the current year
    if (today > target) {
      setIsTimeUp(true);
    }
    setTargetDate(target);
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    if (new Date() >= targetDate) {
      setIsTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      if (new Date() >= targetDate) {
        setIsTimeUp(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden font-writing">
      <div className="relative w-full max-w-4xl">
        {!isTimeUp && targetDate ? (
          <div className="w-full shadow-2xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm rounded-lg p-6 sm:p-10 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">A Surprise is Waiting!</h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8">Unlock in:</p>
            <Countdown targetDate={targetDate} onTimeUp={() => setIsTimeUp(true)} />
          </div>
        ) : (
          <div className="relative group perspective-1000">
            <div className={`relative w-full h-[60vh] sm:h-[70vh] transition-transform duration-1000 preserve-3d ${isTimeUp ? 'rotate-y-180' : ''}`}>
              {/* Back of the envelope (visible initially) */}
              <div className="absolute w-full h-full backface-hidden bg-card border-2 border-primary/20 rounded-lg shadow-2xl flex flex-col items-center justify-center">
                <EnvelopeIcon className="h-24 w-24 text-primary/50" />
                <h2 className="text-3xl font-bold text-primary mt-4">A Letter For You</h2>
                <p className="text-lg text-muted-foreground">From a secret admirer</p>
              </div>

              {/* Front of the envelope with content (visible after flip) */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-background rounded-lg shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-card/80"></div>
                <div className="relative h-full overflow-y-auto p-6 sm:p-10 text-center">
                   <BirthdayContent />
                </div>
                {/* Envelope flap */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-card border-b-2 border-primary/20 rounded-t-lg origin-top transition-transform duration-700 ease-in-out delay-1000 group-hover:-rotate-x-180">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Add CSS to your globals.css or a style tag for the 3D effects
const styles = `
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
.-rotate-x-180 { transform: rotateX(-180deg); }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
