import ProductSlideshow from "@/components/ProductSlideshow";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MapSection from "@/components/MapSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import CallToAction from "@/components/CallToAction";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Home() {
  // Scroll to top when component mounts
  useScrollToTop();
  
  return (
    <div className="flex flex-col w-full">
      {/* Modern, high-quality slideshow showcasing fish products */}
      <ProductSlideshow />
      
      {/* Key business features */}
      <FeatureHighlights />
      
      {/* Featured products section */}
      <FeaturedProducts />
      
      {/* Call to action section */}
      <CallToAction />
      
      {/* About the company */}
      <AboutSection />
      
      {/* Customer testimonials */}
      <TestimonialsSection />
      
      {/* Map and location information */}
      <MapSection />
    </div>
  );
}
