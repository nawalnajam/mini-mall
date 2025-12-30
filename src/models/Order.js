// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

// ✅ Avoid model recompilation on hot reload
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
