import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/lib/types";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FeaturedProducts() {
  const [_, setLocation] = useLocation();
  const [category, setCategory] = useState("all");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const featuredProducts = products?.filter(product => {
    const matchesCategory = category === "all" || product.categoryId === category;
    return product.featured && matchesCategory;
  });
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl">
                Discover our selection of premium seafood products, responsibly sourced 
                and delivered fresh to guarantee the best flavor and quality.
              </p>
            </div>
            <Button 
              variant="link" 
              onClick={() => setLocation('/products')}
              className="mt-4 md:mt-0 group"
            >
              View All Products
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
        
        <Tabs 
          defaultValue="all" 
          value={category}
          onValueChange={setCategory}
          className="mb-10"
        >
          <TabsList className="mb-8">
            {PRODUCT_CATEGORIES.slice(0, 5).map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={category} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <Skeleton className="h-64 w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))
              ) : featuredProducts && featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
