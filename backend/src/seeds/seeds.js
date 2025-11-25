import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();

async function ensureConnected() {
  if (mongoose.connection.readyState === 1) return;
  await connectDB();
}

async function upsertUser({ name, email, password, isAdmin = false }) {
  const exists = await User.findOne({ email });
  if (exists) {
    console.log(`Usuário já existe: ${email}`);
    return exists;
  }

  const user = new User({
    name,
    email,
    password, // o hash será feito pelo pre('save') do modelo
    isAdmin,
  });

  await user.save();
  console.log(`Usuário criado: ${email}  (admin: ${isAdmin})`);
  return user;
}

async function seedProductsIfEmpty() {
  const count = await Product.countDocuments({});
  if (count > 0) {
    console.log(`Catálogo já tem ${count} produtos — não vou duplicar.`);
    return;
  }

  const items = [
    {
      name: "Camiseta Nexus",
      description: "Camiseta 100% algodão premium.",
      price: 59.9,
      stock: 50,
      categories: ["roupas"],
      images: [
        "//http2.mlstatic.com/D_NQ_NP_2X_778208-MLB87247828678_072025-F-camiseta-basica-nx-zero-rock-tour-geek-100-algodo.webp"
      ],
      isActive: true,
    },
    {
      name: "Mouse Gamer Pulse",
      description: "Sensor óptico 12.000 DPI, iluminação RGB.",
      price: 129.9,
      stock: 30,
      categories: ["periféricos", "eletrônicos"],
      images: [
        "https://m.media-amazon.com/images/I/61rqBrI4PML._AC_SX679_.jpg"
      ],
      isActive: true,
    },
    {
      name: "Headset Void",
      description: "Som estéreo com isolamento e microfone removível.",
      price: 199.9,
      stock: 20,
      categories: ["áudio", "eletrônicos"],
      images: [
        "https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Gaming-Headsets/CA-9011201-NA/Gallery/VOID_RGB_ELITE_WIRELESS_CARBON_01.webp"
      ],
      isActive: true,
    },
  ];

  await Product.insertMany(items);
  console.log(`${items.length} produtos inseridos.`);
}

async function main() {
  try {
    await ensureConnected();

    const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@nexusc.art";
    const ADMIN_PASS = process.env.SEED_ADMIN_PASS || "admin123";
    const USER_EMAIL = process.env.SEED_USER_EMAIL || "user@nexusc.art";
    const USER_PASS = process.env.SEED_USER_PASS || "user123";

    await upsertUser({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASS,
      isAdmin: true,
    });
    await upsertUser({
      name: "Cliente",
      email: USER_EMAIL,
      password: USER_PASS,
      isAdmin: false,
    });

    await seedProductsIfEmpty();

    console.log("\n✓ Seed concluído.");
  } catch (err) {
    console.error("Seed falhou:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
