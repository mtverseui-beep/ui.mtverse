"use client";

import { ArtGallerySlider } from "../premium-art-gallery/ArtGallerySlider";

export function ArtGallerySliderCard() {
  return (
    <div className="flex h-full min-h-[600px] w-full bg-background px-3 py-5 sm:px-5 sm:py-6">
      <div className="h-full min-h-0 w-full overflow-hidden rounded-2xl">
        <ArtGallerySlider />
      </div>
    </div>
  );
}
