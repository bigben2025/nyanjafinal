import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { ArrowRight, Anchor } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [_, setLocation] = useLocation();
  
  return (
    <section className="relative bg-primary min-h-[75vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&q=80&w=2000"
          alt="Ocean waves" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Anchor className="h-6 w-6 mr-2" />
              <span className="text-lg font-medium">{COMPANY.tagline}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Seafood <br className="hidden md:block" />
              <span className="text-secondary">Fresh From The Ocean</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              From the waves to your plate, we provide the highest quality 
              seafood sourced responsibly from the finest fishing grounds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setLocation('/products')}
                className="group"
              >
                Browse Our Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white hover:bg-white/20"
                onClick={() => setLocation('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="ocean-wave"></div>
      </div>
    </section>
  );
}
