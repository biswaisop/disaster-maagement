import mongoose from "mongoose";
import dotenv from "dotenv";
import Report from "../models/Report.js"; // Ensure the path is correct
import { connectDB } from "./database.js"; // Ensure the path is correct

dotenv.config(); // Load environment variables

// 🌍 Sample Disaster Reports
const reports = [
  {
    type: "Earthquake",
    description: "A magnitude 6.2 earthquake struck downtown.",
    severity: "critical",
    location: "34.0522,-118.2437", // Los Angeles
  },
  {
    type: "Flood",
    description: "Severe flooding in coastal areas due to heavy rain.",
    severity: "severe",
    location: "40.7128,-74.0060", // New York City
  },
  {
    type: "Fire",
    description: "A large wildfire is spreading rapidly in the forest area.",
    severity: "critical",
    location: "37.7749,-122.4194", // San Francisco
  },
  {
    type: "Hurricane",
    description: "Hurricane warning issued with wind speeds of 120 mph.",
    severity: "severe",
    location: "29.7604,-95.3698", // Houston
  },
  {
    type: "Landslide",
    description: "A landslide blocked a major highway, causing traffic disruptions.",
    severity: "moderate",
    location: "47.6062,-122.3321", // Seattle
  },
];

// 🌱 Seed Function
async function seedDB() {
  try {
    await connectDB();
    await Report.deleteMany(); // Clear existing reports (optional)
    await Report.insertMany(reports);
    console.log("✅ Database Seeded with Demo Disaster Reports!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    mongoose.connection.close();
  }
}

// 🚀 Run Seeder
seedDB();
