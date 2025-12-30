// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// ✅ Use existing model if it exists, otherwise create
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
