"use client";

import BirthdayContent from '@/components/birthday-content';
import Countdown from '@/components/countdown';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden">
      <Countdown>
        <div className="relative w-full max-w-4xl">
          <div className="w-full shadow-2xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm rounded-lg">
            <div className="p-6 sm:p-10 text-center">
              <BirthdayContent />
            </div>
          </div>
        </div>
      </Countdown>
    </main>
  );
}
