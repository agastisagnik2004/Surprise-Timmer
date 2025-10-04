"use client";

import { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: Date;
  onComplete: () => void;
};

type TimeUnitProps = {
    value: number;
    label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
    <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-3 sm:p-4 w-20 sm:w-24">
        <span className="text-3xl sm:text-4xl font-bold text-primary tracking-tighter">{String(value).padStart(2, '0')}</span>
        <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
);


export default function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        onComplete();
      }
      
      return newTimeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    setTimeLeft(calculateTimeLeft());


    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
