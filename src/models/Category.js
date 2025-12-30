// models/Category.js
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

// Avoid recompiling the model on hot reload
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
