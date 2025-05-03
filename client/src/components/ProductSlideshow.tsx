import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { HOMEPAGE_SLIDES } from "@/lib/constants";

export default function ProductSlideshow() {
  const [_, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  // Auto-advance slides
  useEffect(() => {
    if (!emblaApi) return;
    
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on("select", onSelect);
    
    return () => {
      clearInterval(interval);
      if (emblaApi) {
        emblaApi.off("select", onSelect);
      }
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  const handleCTA = useCallback((slide: typeof HOMEPAGE_SLIDES[0]) => {
    switch (slide.ctaText) {
      case "Learn More":
      case "About Us":
        setLocation('/about');
        break;
      case "Browse Products":
        setLocation('/products');
        break;
      case "Find A Location":
      case "Contact Us":
      case "Order Now — Freshness Delivered":
        setLocation('/contact');
        break;
      default:
        setLocation('/');
    }
  }, [setLocation]);

  return (
    <section className="relative w-full min-h-[80vh] bg-background overflow-hidden">
      <div className="embla w-full h-full" ref={emblaRef}>
        <div className="embla__container h-[80vh]">
          {HOMEPAGE_SLIDES.map((slide, index) => (
            <div key={slide.id} className="embla__slide h-full relative flex-[0_0_100%]">
              <div className="relative h-full">
                {/* Slide image */}
                <div className="absolute inset-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                </div>

                {/* Consistent text overlay for all slides */}
                <div className="absolute inset-0 flex items-center justify-start z-10">
                  <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="max-w-lg bg-black/40 p-6 rounded-lg backdrop-blur-sm">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Nyanja Fisheries Ltd
                      </h1>
                      <p className="text-xl md:text-2xl text-white/90 mb-3 font-medium">
                        Fresh Water. Fresh Fish.
                      </p>
                      <p className="text-base md:text-lg text-white/80 mb-6">
                        Uganda's leading source of premium tilapia from the waters of Lake Victoria
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          size="lg" 
                          onClick={() => setLocation('/contact')}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Contact Us Today
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button 
                          size="lg" 
                          variant="secondary"
                          onClick={() => setLocation('/products')}
                          className="bg-white/90 text-primary hover:bg-white"
                        >
                          View Products
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Slide-specific content - hidden but used for accessibility */}
                <div className="sr-only">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtext}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-2 z-10">
          {HOMEPAGE_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index 
                  ? "bg-primary scale-110" 
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-4 flex items-center z-10">
          <button 
            onClick={() => emblaApi?.scrollPrev()}
            className="h-10 w-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center z-10">
          <button 
            onClick={() => emblaApi?.scrollNext()}
            className="h-10 w-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}