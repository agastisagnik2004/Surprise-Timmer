import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  image: string 
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
