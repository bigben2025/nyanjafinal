import { useState, useEffect } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TESTIMONIALS } from "@/lib/constants";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from the restaurants, markets, and fish lovers across Uganda who trust Nyanja Fisheries
            for their premium freshwater Tilapia.
          </p>
        </motion.div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial) => (
              <CarouselItem key={testimonial.id} className={isMobile ? "w-full" : "w-1/3"}>
                <div className="p-1">
                  <Card>
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary opacity-20 mb-4" />
                      <p className="text-gray-700 mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative mr-2 static transform-none" />
            <CarouselNext className="relative ml-2 static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
