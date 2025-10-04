"use client";

import { useState, useEffect } from 'react';
import BirthdayContent from '@/components/birthday-content';
import Countdown from '@/components/countdown';
import { Card, CardContent } from '@/components/ui/card';
import { BalloonIcon, CakeIcon, GiftIcon } from '@/components/icons';

const getTargetDate = () => {
  // For demonstration, let's set the birthday for a future time.
  // In a real application, you would set the actual birthday.
  // Example: new Date('2025-05-20T00:00:00')
  const target = new Date();
  
  // Set target to tomorrow at midnight for a live demo
  target.setDate(target.getDate() + 1);
  target.setHours(0, 0, 0, 0);

  return target;
};


export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    // This effect runs only on the client, preventing hydration mismatch
    const date = getTargetDate();
    setTargetDate(date);

    const checkUnlock = () => {
      if (new Date() >= date) {
        setIsUnlocked(true);
        if (interval) clearInterval(interval);
      }
    };

    const interval = setInterval(checkUnlock, 1000);
    checkUnlock(); // Initial check

    return () => clearInterval(interval);
  }, []);

  if (!targetDate) {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
            <div className="flex items-center gap-4 text-primary text-2xl font-bold font-headline">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <span>Loading Surprise...</span>
            </div>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        {/* Decorative elements */}
        <BalloonIcon className="absolute -top-16 -left-8 sm:-left-16 h-24 w-24 text-accent opacity-30 transform -rotate-12 animate-pulse" />
        <GiftIcon className="absolute -bottom-16 -right-8 sm:-right-16 h-24 w-24 text-primary opacity-20 transform rotate-12" />
        <CakeIcon className="absolute -top-12 -right-8 sm:-right-12 h-20 w-20 text-primary/40 opacity-40 transform" />
        
        <Card className="w-full shadow-2xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-10 text-center">
            {isUnlocked ? (
              <BirthdayContent />
            ) : (
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-headline">A Surprise is Waiting!</h1>
                <p className="text-muted-foreground text-lg">It unlocks at midnight...</p>
                <Countdown targetDate={targetDate} onComplete={() => setIsUnlocked(true)} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
