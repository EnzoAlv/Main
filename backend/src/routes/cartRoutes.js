import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/cart  → retorna o carrinho do usuário
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.user).populate("cart.product");
  res.json(user.cart);
});

// POST /api/cart  → adiciona produto ao carrinho
router.post("/", protect, async (req, res) => {
  const { productId, qty } = req.body;

  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });

  const existing = user.cart.find((item) => item.product.toString() === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    user.cart.push({ product: productId, qty });
  }

  await user.save();
  res.json(user.cart);
});

router.delete("/remove-all", protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  user.cart = [];
  await user.save();

  res.json(user.cart);
});


// GET /api/cart/summary → quantidade total de itens
router.get("/summary", protect, async (req, res) => {
  const user = await User.findById(req.user);
  
  const total = user.cart.reduce((acc, item) => acc + item.qty, 0);

  res.json({ total });
});

export default router;
