import { users, type User, type InsertUser, type Product, type InsertProduct, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  
  // Contact methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userIdCounter: number;
  private productIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.contactSubmissions = new Map();
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.contactIdCounter = 1;
    
    // Initialize with sample products
    this.initSampleProducts();
  }

  private initSampleProducts() {
    // Authentic Ugandan fish products focusing on tilapia
    const sampleProducts: InsertProduct[] = [
      {
        name: "Fresh Lake Victoria Tilapia",
        description: "Premium fresh tilapia from Lake Victoria. Sustainably harvested with firm white flesh perfect for grilling or frying.",
        categoryId: "tilapia",
        price: "Contact for pricing",
        unit: "kg",
        featured: true,
        image: "https://images.unsplash.com/photo-1611171711810-ae02a99bfda4?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Whole Tilapia",
        description: "Whole fresh tilapia, gutted and cleaned. Perfect for traditional Ugandan recipes and grilling.",
        categoryId: "tilapia",
        price: "Contact for pricing",
        unit: "kg",
        featured: true,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Medium-Sized Tilapia",
        description: "Medium-sized whole tilapia, ideal for smaller families or individual servings. Fresh from Lake Victoria.",
        categoryId: "tilapia",
        price: "Contact for pricing",
        unit: "kg",
        featured: false,
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Premium Tilapia",
        description: "Our largest size of tilapia, perfect for special occasions and larger gatherings. Exceptional quality and flavor.",
        categoryId: "tilapia",
        price: "Contact for pricing",
        unit: "kg",
        featured: true,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Tilapia Fillets",
        description: "Boneless tilapia fillets, perfect for quick meals. Our fillets are prepared fresh daily for superior taste.",
        categoryId: "tilapia",
        price: "Contact for pricing",
        unit: "kg",
        featured: true,
        image: "https://images.unsplash.com/photo-1517115358639-5720b8e02219?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Tilapia Fry Cuts",
        description: "Tilapia cut into small pieces, ready for frying. Ideal for quick cooking and perfect crispy texture.",
        categoryId: "value-added",
        price: "Contact for pricing",
        unit: "kg",
        featured: false,
        image: "https://images.unsplash.com/photo-1556386734-4227a180d19e?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Smoked Tilapia",
        description: "Traditionally smoked tilapia, a delicacy with rich flavor. Ready to eat or add to soups and stews.",
        categoryId: "value-added",
        price: "Contact for pricing",
        unit: "kg",
        featured: true,
        image: "https://images.unsplash.com/photo-1594063596316-47f20c828851?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Tilapia Fish Heads",
        description: "Fresh tilapia fish heads, perfect for traditional soups and stews.",
        categoryId: "specialty",
        price: "Contact for pricing",
        unit: "kg",
        featured: false,
        image: "https://images.unsplash.com/photo-1551344081-c6f47d9dd24f?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Tilapia for Restaurants",
        description: "Bulk orders of tilapia for restaurants and catering services. Consistent quality and reliable supply.",
        categoryId: "specialty",
        price: "Contact for pricing",
        unit: "Bulk orders",
        featured: true,
        image: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      },
      {
        name: "Tilapia Fish Fingers",
        description: "Ready-to-cook tilapia strips, perfect for quick meals and children's lunches.",
        categoryId: "value-added",
        price: "Contact for pricing",
        unit: "kg",
        featured: false,
        image: "https://images.unsplash.com/photo-1485451772704-fe21ff39dfe6?auto=format&fit=crop&q=80&w=800",
        availability: "in-stock"
      }
    ];
    
    sampleProducts.forEach(product => {
      this.addProduct(product);
    });
  }
  
  private addProduct(insertProduct: InsertProduct): Product {
    const id = this.productIdCounter++;
    const createdAt = new Date();
    // Ensure featured is not undefined
    const featured = insertProduct.featured === undefined ? false : insertProduct.featured;
    
    // Ensure availability is a valid type
    const availability = (insertProduct.availability === 'in-stock' || 
                         insertProduct.availability === 'limited' || 
                         insertProduct.availability === 'seasonal' || 
                         insertProduct.availability === 'out-of-stock') 
                         ? insertProduct.availability 
                         : 'out-of-stock';
    
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt,
      featured,
      availability
    };
    this.products.set(id, product);
    return product;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  // Contact methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactIdCounter++;
    const createdAt = new Date();
    // Ensure phone and companyName are not undefined
    const phone = submission.phone || null;
    const companyName = submission.companyName || null;
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt,
      phone,
      companyName
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
}

export const storage = new MemStorage();
