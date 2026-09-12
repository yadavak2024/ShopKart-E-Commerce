import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable over-ear headphones with deep bass and long battery life.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    rating: 4.6,
    stock: 20
  },
  {
    name: "Smart Watch",
    description: "Modern smartwatch with fitness tracking, notifications and a bright display.",
    price: 3299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    rating: 4.4,
    stock: 15
  },
  {
    name: "Running Shoes",
    description: "Lightweight everyday running shoes designed for comfort.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    rating: 4.7,
    stock: 30
  },
  {
    name: "Minimal Backpack",
    description: "Water-resistant backpack with laptop compartment and multiple pockets.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    rating: 4.5,
    stock: 18
  },
  {
    name: "Coffee Maker",
    description: "Compact coffee maker for fresh coffee at home or work.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80",
    category: "Home",
    rating: 4.3,
    stock: 12
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with a clean modern design.",
    price: 899,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    category: "Home",
    rating: 4.4,
    stock: 25
  }
];

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log("Products seeded");
await mongoose.disconnect();
