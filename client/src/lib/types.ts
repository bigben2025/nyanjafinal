// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  price: string;
  unit: string;
  featured: boolean;
  image: string;
  availability: "in-stock" | "limited" | "seasonal" | "out-of-stock";
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  companyName?: string;
}

// Testimonial
export interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  image: string;
}

// About section
export interface AboutSection {
  id: string;
  title: string;
  content: string;
}
