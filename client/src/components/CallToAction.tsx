import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, ShoppingBasket } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";

export default function CallToAction() {
  const [_, setLocation] = useLocation();
  
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
          alt="Fresh seafood" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Freshest Seafood?
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Whether you're a restaurant owner looking for reliable seafood supplier or a seafood 
              enthusiast wanting the finest quality for your home cooking, Nyanja Fisheries has you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setLocation('/products')}
                className="bg-white text-primary hover:bg-white/90 group"
              >
                <ShoppingBasket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Browse Our Products
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/90 text-primary hover:bg-white"
                asChild
              >
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call For Orders: {COMPANY.phone}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}