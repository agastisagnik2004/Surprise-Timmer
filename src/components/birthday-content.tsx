import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CakeIcon, GiftIcon } from '@/components/icons';

export default function BirthdayContent() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

  return (
    <div className="animate-in fade-in-50 duration-1000 space-y-8 sm:space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary font-headline tracking-tight">
          Happy Birthday!
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          The wait is over! Wishing you a day filled with love, laughter, and all the things that make you happy.
        </p>
      </header>
      
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary/80 mb-6 flex items-center justify-center gap-3">
            <GiftIcon className="h-7 w-7 text-accent" />
            Photo Gallery
            <GiftIcon className="h-7 w-7 text-accent" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="group overflow-hidden rounded-lg shadow-lg aspect-square">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={image.imageHint}
                priority={galleryImages.indexOf(image) === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 p-6 rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary/80 mb-4 flex items-center justify-center gap-3">
          <CakeIcon className="h-7 w-7 text-accent" />
          A Special Wish
          <CakeIcon className="h-7 w-7 text-accent" />
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed italic">
          "Remember that one time we almost missed the train but made it just in time? That's how I hope your year goes: a thrilling adventure where everything works out perfectly in the end. May your year ahead be as exciting and wonderful as you are. Cheers to many more memories!"
        </p>
      </section>
    </div>
  );
}
