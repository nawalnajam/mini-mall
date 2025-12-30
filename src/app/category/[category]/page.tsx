import ProductCard from "@/components/product/ProductCard";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Mongoose schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
});

// Avoid recompiling model
const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export async function generateStaticParams() {
  await dbConnect();

  // Get all unique categories from DB
  const categories: string[] = await ProductModel.distinct("category");

  // Return lowercase for URL consistency
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  try {
    await dbConnect();

    const products: Product[] = await ProductModel.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    }).lean();

    if (!products || products.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          No products found in <b>{category}</b>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold capitalize mb-6">{category}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id.toString()}
              _id={product._id.toString()}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load products
      </div>
    );
  }
}
