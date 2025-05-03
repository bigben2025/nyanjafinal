import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function OrderCallout() {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Ready to order fresh tilapia?
          </h2>
          
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white"
            asChild
          >
            <a href={`tel:${COMPANY.phone}`} className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Call For Orders: {COMPANY.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}