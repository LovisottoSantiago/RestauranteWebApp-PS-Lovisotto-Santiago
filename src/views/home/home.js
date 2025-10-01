import { HeroSection, initHeroSection } from '../home/sections/HeroSection.js';
import { FeaturesSection, initFeaturesSection } from '../home/sections/FeaturesSection.js';
import { GallerySection, initGallerySection } from '../home/sections/GallerySection.js';
import { TestimonialsSection, initTestimonialsSection } from '../home/sections/TestimonialsSection.js';
import { CTASection, initCTASection } from '../home/sections/CTASection.js';

export function renderHome() {
  const container = document.getElementById("app");
  container.innerHTML = `
    <div class="home-container">
      ${HeroSection()}
      ${FeaturesSection()}
      ${GallerySection()}
      ${TestimonialsSection()}
      ${CTASection()}
    </div>
  `;

  initHeroSection();
  initFeaturesSection();
  initGallerySection();
  initTestimonialsSection();
  initCTASection();
}
