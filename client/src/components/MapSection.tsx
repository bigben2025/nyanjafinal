import { useState, useEffect } from "react";
import { COMPANY } from "@/lib/constants";
import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface MapSectionProps {
  fullWidth?: boolean;
}

export default function MapSection({ fullWidth = false }: MapSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${COMPANY.mapCoordinates.lng - 0.01}%2C${COMPANY.mapCoordinates.lat - 0.01}%2C${COMPANY.mapCoordinates.lng + 0.01}%2C${COMPANY.mapCoordinates.lat + 0.01}&layer=mapnik&marker=${COMPANY.mapCoordinates.lat}%2C${COMPANY.mapCoordinates.lng}`;
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${COMPANY.mapCoordinates.lat}%2C${COMPANY.mapCoordinates.lng}`;
  
  if (fullWidth) {
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse flex flex-col items-center">
              <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
        <iframe 
          src={mapUrl}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }}
          allowFullScreen 
          aria-hidden="false" 
          tabIndex={0}
          title="Company Location Map"
          className={mapLoaded ? "opacity-100" : "opacity-0"}
          onLoad={() => setMapLoaded(true)}
        />
        <div className="absolute bottom-4 right-4">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center hover:bg-primary/90 transition-colors"
          >
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
        </div>
      </div>
    );
  }
  
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
            Visit Our Location
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located right on the harbor, our facilities are easily accessible and
            provide direct access to the freshest seafood.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-md h-[400px] relative">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="animate-pulse flex flex-col items-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }}
              allowFullScreen 
              aria-hidden="false" 
              tabIndex={0}
              title="Company Location Map"
              className={mapLoaded ? "opacity-100" : "opacity-0"}
              onLoad={() => setMapLoaded(true)}
            />
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="font-bold text-xl mb-4">Find Us At</h3>
              <div className="space-y-4">
                <div className="flex">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{COMPANY.address}</p>
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Business Hours</p>
                  <div className="text-muted-foreground space-y-1 mt-1">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
