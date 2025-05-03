import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Anchor, Menu, X, Fish, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="bg-primary rounded-full p-1.5">
                <Fish className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-primary">{COMPANY.name}</span>
                <span className="sr-only">{COMPANY.tagline}</span>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.path;
              return (
                <Link key={link.path} href={link.path}>
                  <div className={`relative font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-600 hover:text-primary"
                  } cursor-pointer`}>
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href={`tel:${COMPANY.phone}`} 
              className="text-gray-600 hover:text-primary font-medium flex items-center"
            >
              <Phone className="mr-1 h-4 w-4" />
              {COMPANY.phone}
            </a>
            <a 
              href={`https://wa.me/${COMPANY.whatsapp}`} 
              target="_blank"
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md px-3 py-1.5"
            >
              <FaWhatsapp className="mr-1.5 h-4 w-4" />
              WhatsApp
            </a>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="bg-primary rounded-full p-1.5">
                          <Fish className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">{COMPANY.name}</span>
                      </div>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="px-6 py-8 flex-1 overflow-auto">
                  <nav className="flex flex-col space-y-6">
                    {NAV_LINKS.map((link) => {
                      const isActive = location === link.path;
                      return (
                        <Link 
                          key={link.path} 
                          href={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={`text-lg font-medium ${
                            isActive 
                              ? "text-primary" 
                              : "text-gray-700 hover:text-primary"
                          } cursor-pointer`}>
                            {link.name}
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="p-6 border-t">
                  <div className="flex flex-col space-y-4">
                    <a 
                      href={`tel:${COMPANY.phone}`}
                      className="flex items-center text-gray-700 hover:text-primary"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      {COMPANY.phone}
                    </a>
                    <a 
                      href={`https://wa.me/${COMPANY.whatsapp}`}
                      target="_blank"
                      className="flex items-center text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md"
                    >
                      <FaWhatsapp className="h-5 w-5 mr-2" />
                      WhatsApp Chat
                    </a>
                    <Link href="/contact">
                      <Button 
                        className="w-full" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
