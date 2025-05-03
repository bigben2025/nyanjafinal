import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Phone, MessageSquare, X } from "lucide-react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end space-y-2">
        {isOpen && (
          <div className="flex flex-col items-end space-y-2 animate-fade-in-up">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Call Us</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#25D366]/90 transition-colors"
                  >
                    <MessageSquare className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>WhatsApp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        <Button
          onClick={toggleOpen}
          className={`rounded-full w-14 h-14 shadow-lg ${
            isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="flex flex-col items-center justify-center text-xs font-semibold">
              <span>Contact</span>
              <span>Us</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
