"use client";

import { useState, useEffect } from 'react';
import BirthdayContent from '@/components/birthday-content';
import Countdown from '@/components/countdown';

export default function Home() {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    // Set target for June 22nd of the current year, at midnight.
    const target = new Date(today.getFullYear(), 5, 22, 0, 0, 0); 
    setTargetDate(target);

    if (new Date() >= target) {
      setIsTimeUp(true);
    }
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
          <div className="w-full shadow-2xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm rounded-lg p-6 sm:p-10 text-center animate-in fade-in-50 duration-1000">
            <BirthdayContent />
          </div>
        )}
      </div>
    </main>
  );
}
