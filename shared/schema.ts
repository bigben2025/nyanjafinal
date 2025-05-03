import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product Schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id").notNull(),
  price: text("price").notNull(),
  unit: text("unit").notNull(),
  featured: boolean("featured").default(false),
  image: text("image").notNull(),
  availability: text("availability").notNull().$type<"in-stock" | "limited" | "seasonal" | "out-of-stock">(),
  createdAt: timestamp("created_at").defaultNow()
});

export const productSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof productSchema>;

// Contact Form Schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow()
});

export const contactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof contactSchema>;

// Users Schema (from existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
