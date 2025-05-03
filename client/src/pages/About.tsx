import { Separator } from "@/components/ui/separator";
import { ABOUT_SECTIONS, COMPANY } from "@/lib/constants";
import { Anchor, Ship, Fish, Award, Leaf, Shield } from "lucide-react";
import { motion } from "framer-motion";
import OrderCallout from "@/components/OrderCallout";

export default function About() {
  const companyValues = [
    {
      icon: <Leaf className="h-10 w-10 text-secondary" />,
      title: "Sustainability",
      description: "We're committed to sustainable fishing practices that protect marine ecosystems for future generations."
    },
    {
      icon: <Award className="h-10 w-10 text-secondary" />,
      title: "Quality",
      description: "We maintain rigorous quality standards throughout our entire supply chain."
    },
    {
      icon: <Shield className="h-10 w-10 text-secondary" />,
      title: "Integrity",
      description: "We operate with honesty and transparency in every business relationship."
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">About Nyanja Fisheries</h1>
        <p className="text-muted-foreground mb-8">
          Delivering premium seafood since {COMPANY.yearFounded}
        </p>
        
        <div className="relative rounded-xl overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1545674836-98247e7e3ed2?auto=format&fit=crop&q=80&w=2000" 
            alt="Fishing boats at harbor" 
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center text-white">
              <Ship className="h-6 w-6 mr-2" />
              <span className="font-medium">From ocean to plate: {new Date().getFullYear() - COMPANY.yearFounded} years of excellence</span>
            </div>
          </div>
        </div>
        
        {/* Call for Orders section */}
        <div className="-mx-4 mt-8 mb-8">
          <OrderCallout />
        </div>
        
        <div className="space-y-12">
          {ABOUT_SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
              id={section.id}
            >
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
              {index < ABOUT_SECTIONS.length - 1 && <Separator className="mt-8" />}
            </motion.div>
          ))}
        </div>
        
        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="rounded-full bg-secondary/10 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary text-white rounded-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Nyanja Fisheries By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-3xl font-bold">{new Date().getFullYear() - COMPANY.yearFounded}</p>
                <p className="text-sm">Years in Business</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm">Fishing Vessels</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm">Seafood Products</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">100+</p>
                <p className="text-sm">Restaurant Partners</p>
              </div>
            </div>
          </div>
          <div className="bg-primary-foreground/10 p-6">
            <div className="flex items-center justify-center">
              <Anchor className="h-5 w-5 mr-2" />
              <p className="text-sm">Committed to sustainable fishing practices and ocean conservation</p>
            </div>
          </div>
        </motion.div>
        
        {/* Team */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Seafarer", position: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
              { name: "Maria Ocean", position: "Operations Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
              { name: "David Fisherman", position: "Fleet Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
