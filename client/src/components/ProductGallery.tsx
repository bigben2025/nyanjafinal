import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGallery({ products, isLoading }: ProductGalleryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleNavigateProduct = (direction: 'next' | 'prev') => {
    if (!selectedProduct || products.length === 0) return;
    
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % products.length;
    } else {
      newIndex = (currentIndex - 1 + products.length) % products.length;
    }
    
    setSelectedProduct(products[newIndex]);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleProductClick(product)}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <div className="absolute top-2 right-2 z-10 md:hidden">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsDialogOpen(false)}
                    className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-64 md:h-full">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleNavigateProduct('prev')}
                    className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80 ml-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleNavigateProduct('next')}
                    className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80 mr-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {PRODUCT_CATEGORIES.find(c => c.id === selectedProduct.categoryId)?.name}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xl font-semibold text-primary">
                    {selectedProduct.price} / {selectedProduct.unit}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${selectedProduct.availability === 'in-stock' ? 'bg-green-100 text-green-800' : 
                        selectedProduct.availability === 'limited' ? 'bg-amber-100 text-amber-800' :
                        selectedProduct.availability === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'}`}>
                      {selectedProduct.availability === 'in-stock' ? 'In Stock' : 
                        selectedProduct.availability === 'limited' ? 'Limited Stock' :
                        selectedProduct.availability === 'seasonal' ? 'Seasonal' :
                        'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm text-center">
                      For pricing, availability and orders, please contact our sales team:
                    </p>
                    <div className="flex justify-center gap-4 mt-3">
                      <a 
                        href={`tel:${COMPANY.phone}`}
                        className="inline-flex items-center text-primary hover:text-primary/80"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call Us
                      </a>
                      <a 
                        href={`mailto:${COMPANY.email}`}
                        className="inline-flex items-center text-primary hover:text-primary/80"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
