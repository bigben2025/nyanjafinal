import { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryName = PRODUCT_CATEGORIES.find(
    (cat) => cat.id === product.categoryId
  )?.name;
  
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative h-64 bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={product.featured ? "secondary" : "outline"} className="capitalize">
            {product.featured ? "Featured" : categoryName}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge
            variant={
              product.availability === "in-stock"
                ? "default"
                : product.availability === "limited"
                ? "secondary"
                : product.availability === "seasonal"
                ? "outline"
                : "destructive"
            }
            className="capitalize"
          >
            {product.availability.replace("-", " ")}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-primary font-medium">Contact for pricing</span>
          <span className="text-xs text-muted-foreground">
            {product.unit === "kg" ? "Various sizes available" : product.unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
