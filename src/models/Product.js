// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;