"use client";

import { useState, useEffect } from 'react';

type CountdownProps = {
  targetDate: Date;
  onTimeUp: () => void;
};

export default function Countdown({ targetDate, onTimeUp }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimeUp();
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && interval !== 'seconds' && Object.keys(timeLeft).length > 1) {
        // Don't push anything if value is 0 and it's not the last unit
    } else {
        timerComponents.push(
            <div key={interval} className="flex flex-col items-center justify-center bg-primary/10 p-4 rounded-lg min-w-[80px]">
                <span className="text-4xl sm:text-5xl font-bold text-primary">
                {(timeLeft[interval as keyof typeof timeLeft] || 0).toString().padStart(2, '0')}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                {interval}
                </span>
            </div>
        );
    }
  });

  return (
    <div className="flex justify-center gap-2 sm:gap-4 font-sans">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
