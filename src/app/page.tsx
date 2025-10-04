"use client";

import BirthdayContent from '@/components/birthday-content';
import { Card, CardContent } from '@/components/ui/card';
import { BalloonIcon, CakeIcon, GiftIcon } from '@/components/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        {/* Decorative elements */}
        <BalloonIcon className="absolute -top-16 -left-8 sm:-left-16 h-24 w-24 text-accent opacity-30 transform -rotate-12 animate-pulse" />
        <GiftIcon className="absolute -bottom-16 -right-8 sm:-right-16 h-24 w-24 text-primary opacity-20 transform rotate-12" />
        <CakeIcon className="absolute -top-12 -right-8 sm:-right-12 h-20 w-20 text-primary/40 opacity-40 transform" />
        
        <Card className="w-full shadow-2xl border-2 border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-10 text-center">
            <BirthdayContent />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
