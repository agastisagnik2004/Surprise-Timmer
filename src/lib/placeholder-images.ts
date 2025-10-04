import { StaticImageData } from 'next/image'; // Only if using Next.js

export type ImagePlaceholder = {
  id: string;
  description: string;
  image: StaticImageData; // Use 'any' if not Next.js
  imageHint: string;
};
