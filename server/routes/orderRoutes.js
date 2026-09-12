import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer?.name || !customer?.email || !customer?.address || !items?.length) {
      return res.status(400).json({ message: "Customer details and cart items are required" });
    }

    const order = await Order.create({ customer, items, total });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
