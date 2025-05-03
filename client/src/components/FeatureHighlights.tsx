import { motion } from "framer-motion";
import { Truck, Award, Fish, DollarSign } from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <Fish className="h-8 w-8 mb-4 text-primary" />,
      title: "Fresh Quality",
      description: "Daily catches and stringent quality control ensure only the freshest fish reach your plate."
    },
    {
      icon: <Truck className="h-8 w-8 mb-4 text-primary" />,
      title: "Fast Delivery",
      description: "Same-day delivery to local businesses and next-day shipping nationwide with temperature-controlled packaging."
    },
    {
      icon: <Award className="h-8 w-8 mb-4 text-primary" />,
      title: "Sustainable Sourcing",
      description: "All our seafood is sustainably sourced to protect marine ecosystems and ensure future availability."
    },
    {
      icon: <DollarSign className="h-8 w-8 mb-4 text-primary" />,
      title: "Competitive Pricing",
      description: "Direct sourcing from fishermen allows us to offer premium quality at competitive prices."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Nyanja Fisheries
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We pride ourselves on providing the highest quality seafood through sustainable practices and 
            exceptional service to our customers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-6 rounded-lg text-center h-full flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}