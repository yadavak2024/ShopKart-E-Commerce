import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true }
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Placed" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
