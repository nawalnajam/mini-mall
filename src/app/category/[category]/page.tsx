export const dynamic = "force-dynamic";
export const revalidate = 0;

import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  try {
    await dbConnect();

    const products = await Product.find({
      category: { $regex: `^${params.category}$`, $options: "i" },
    }).lean();

    if (!products.length) {
      return (
        <div className="p-8 text-center text-gray-500">
          No products found in <b>{params.category}</b>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold capitalize mb-6">
          {params.category}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {products.map((p: any) => (
            <ProductCard
              key={p._id.toString()}
              _id={p._id.toString()}
              name={p.name}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("CATEGORY PAGE ERROR:", err);
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load products
      </div>
    );
  }
}
