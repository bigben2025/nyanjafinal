import { Link } from "wouter";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Linkedin, Fish, Mail, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a newsletter API
    toast({
      title: "Thank you for subscribing",
      description: "You've been added to our newsletter."
    });
    setEmail("");
  };
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <div className="bg-white rounded-full p-1.5">
                  <Fish className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-xl text-white">{COMPANY.name}</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm">
              {COMPANY.tagline}. Proudly serving communities across Uganda with the freshest fish since {COMPANY.yearFounded}.
            </p>
            <div className="flex space-x-3">
              <a 
                href={COMPANY.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href={COMPANY.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href={COMPANY.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href={COMPANY.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Outlets</h3>
            <ul className="space-y-3">
              {COMPANY.locations.map((location) => (
                <li key={location.name} className="flex items-start">
                  <MapPin className="h-4 w-4 mt-1 mr-2 text-primary" />
                  <div>
                    <span className="text-white">{location.name}</span>
                    <a 
                      href={`tel:${location.phone}`} 
                      className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      {location.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="text-gray-400 mb-2">{COMPANY.address}</p>
              <p className="text-gray-400 mb-2">
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </p>
              <p className="text-gray-400 mb-2">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </p>
            </address>
            
            <h3 className="font-semibold text-lg mt-6 mb-4">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="pl-9 bg-gray-800 border-gray-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="ml-1" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy">
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
            </Link>
            <Link href="/terms">
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
