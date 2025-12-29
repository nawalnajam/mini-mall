import ProductCard from "@/components/product/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // ✅ Next.js 16 fix
  const { category } = await params;

  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  // ✅ SAFETY CHECK (bohat zaroori)
  if (!res.ok) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load products
      </div>
    );
  }

  const products: Product[] = await res.json();

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  if (filtered.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No products found in <b>{category}</b>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {category}
      </h1>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
