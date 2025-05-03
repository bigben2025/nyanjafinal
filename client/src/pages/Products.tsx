import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import ProductGallery from "@/components/ProductGallery";
import OrderCallout from "@/components/OrderCallout";
import { Product } from "@/lib/types";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const sortedProducts = filteredProducts ? [...filteredProducts].sort((a, b) => {
    if (sortOption === "featured") {
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    } else if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortOption === "price-asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === "price-desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  }) : [];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Seafood Products</h1>
        <p className="text-muted-foreground mb-6">
          Browse our selection of premium seafood caught fresh from the ocean
        </p>
      </motion.div>
      
      <Separator className="my-6" />
      
      <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
        <div className="w-full md:w-64 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="font-medium">Search Products</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="font-medium">Categories</h3>
            <div className="space-y-1">
              {PRODUCT_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="font-medium">Sort By</h3>
            <Tabs defaultValue={sortOption} onValueChange={(value) => setSortOption(value)}>
              <TabsList className="grid grid-cols-2 w-full h-auto">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="name-asc">Name (A-Z)</TabsTrigger>
                <TabsTrigger value="name-desc">Name (Z-A)</TabsTrigger>
                <TabsTrigger value="price-asc">Price (Low-High)</TabsTrigger>
                <TabsTrigger value="price-desc">Price (High-Low)</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredProducts ? (
                <p className="text-muted-foreground">
                  Showing {sortedProducts.length} products
                </p>
              ) : (
                <p className="text-muted-foreground">Loading products...</p>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 md:hidden"
            >
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProductGallery products={sortedProducts} isLoading={isLoading} />
          </motion.div>
          
          <div className="mt-12">
            <OrderCallout />
          </div>
        </div>
      </div>
    </div>
  );
}
