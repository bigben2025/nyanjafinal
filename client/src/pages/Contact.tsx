import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";
import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/lib/constants";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Get in touch with our team for inquiries, orders, or partnerships
        </p>
      </motion.div>
      
      <Separator className="my-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Send Us A Message</h2>
          <ContactForm />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{COMPANY.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{COMPANY.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{COMPANY.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <div className="flex space-x-4">
              <a 
                href={COMPANY.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={COMPANY.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Wholesale Inquiries</h3>
            <p className="text-muted-foreground mb-3">
              If you're interested in wholesale purchases or business partnerships, 
              please contact our sales team directly:
            </p>
            <p className="font-medium">wholesale@nyanjafisheries.com</p>
            <p className="font-medium">+1-555-SEAFOOD ext. 2</p>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="h-96 rounded-xl overflow-hidden">
          <MapSection fullWidth />
        </div>
      </motion.div>
    </div>
  );
}
