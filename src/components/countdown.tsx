"use client";

import React, { useState, useEffect } from 'react';
import { EnvelopeIcon } from '@/components/icons';

const Countdown = ({ children }: { children: React.ReactNode }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const birthday = new Date(now.getFullYear(), 5, 25); // June 25th
      if (now > birthday) {
        birthday.setFullYear(now.getFullYear() + 1);
      }
      
      const nextBirthday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      nextBirthday.setHours(0, 0, 0, 0);

      const difference = nextBirthday.getTime() - now.getTime();

      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        setIsTimeUp(true);
      }
      
      return timeLeft;
    };

    const initialTimeLeft = calculateTimeLeft();
    if (Object.keys(initialTimeLeft).length === 0) {
        setIsTimeUp(true);
    } else {
        setTimeLeft(initialTimeLeft as any);
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        setIsTimeUp(true);
        clearInterval(timer);
      } else {
        setTimeLeft(newTimeLeft as any);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isTimeUp) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative">
        <EnvelopeIcon className="w-48 h-48 sm:w-64 sm:h-64 text-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-primary/20">
                <h2 className="text-2xl font-bold text-primary font-headline mb-2">A surprise is waiting!</h2>
                <p className="text-muted-foreground mb-4">Unlock in:</p>
                <div className="flex justify-center space-x-2 sm:space-x-4 text-lg sm:text-2xl font-mono text-primary font-bold">
                    <div>{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div>:</div>
                    <div>{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div>:</div>
                    <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
