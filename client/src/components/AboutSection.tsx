import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { COMPANY, ABOUT_SECTIONS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [_, setLocation] = useLocation();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Nyanja Fisheries
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Founded in {COMPANY.yearFounded}, Nyanja Fisheries has grown from a small
              family-operated business to one of the region's premier seafood suppliers.
            </p>
            
            <div className="space-y-4 mb-8">
              {ABOUT_SECTIONS.slice(0, 2).map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.content}</p>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => setLocation('/about')}
              className="group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1534766438357-2b270dbd1b40?auto=format&fit=crop&q=80&w=600"
                alt="Fishing boats" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1579105728744-9d8bd4e0c9a9?auto=format&fit=crop&q=80&w=600"
                alt="Seafood market" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
            <div className="mt-8 space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1579179339136-a0e0c6e87961?auto=format&fit=crop&q=80&w=600"
                alt="Fresh seafood" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1596854273338-cbf078ec7071?auto=format&fit=crop&q=80&w=600"
                alt="Fishing activity" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
