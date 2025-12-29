"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  // Carousel slides
  const slides = [
    { id: 1, image: "/images/1.avif", title: "Latest Fashion", subtitle: "Trendy outfits & accessories" },
    { id: 2, image: "/images/makeup.jpg", title: "Beauty & Makeup", subtitle: "Glow with premium cosmetics" },
    { id: 3, image: "/images/trend.avif", title: "MiniMall Exclusive", subtitle: "Shop the latest trends" },
  ];

  // Categories
 const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    image: "/images/mens.jpg",
    category: "mens",
  },
  {
    id: 2,
    name: "Women's Fashion",
    image: "/images/w1.jpg",
    category: "womens",
  },
  {
    id: 3,
    name: "Shoes",
    image: "/images/shoss.pg.jpg",
    category: "shoes",
  },
  {
    id: 4,
    name: "Accessories",
    image: "/images/a2.jpg",
    category: "accessories",
  },
  {
    id: 5,
    name: "Beauty & Makeup",
    image: "/images/b1.jpg",
    category: "beauty",
  },
  {
    id: 6,
    name: "Electronics",
    image: "/images/e5.jpg",
    category: "electronics",
  },
];


  // Products
  const products = [
    { id: 1, name: "Stylish Handbag", image: "/images/category1.jpg", price: "Rs 2500" },
    { id: 2, name: "Sneakers", image: "/images/sneekjpg.jpg", price: "Rs 3000" },
    { id: 3, name: "Sunglasses", image: "/images/glasses.jpg", price: "Rs 4500" },
    { id: 4, name: "Watch", image: "/images/watch.jpg", price: "Rs 6000" },
    { id: 5, name: "Rings", image: "/images/ac5.jpg", price: "Rs 7000" },
  ];

  return (
    <div className="w-full">

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-screen h-[450px] md:h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <Image src={slide.image} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

              <h2 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">{slide.title}</h2>
              <p className="text-white text-lg md:text-xl drop-shadow-md">{slide.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
{/*category section */}
    <section className="py-12 px-4 md:px-20 bg-gray-100">
  <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>

  <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
    {categories.map((cat) => (
      <Link
        key={cat.id}
        href={`/category/${cat.category}`}
        className="min-w-[180px] flex-shrink-0 relative group cursor-pointer"
      >
        <Image
          src={cat.image}
          alt={cat.name}
          width={180}
          height={180}
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
          <h3 className="text-white font-bold text-lg">
            {cat.name}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</section>


      {/* Best Selling Products */}
      <section className="py-12 px-4 md:px-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Best Selling Products</h2>
        <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide">
          {products.map((prod) => (
            <div key={prod.id} className="min-w-[200px] flex-shrink-0 border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer">
              <Image
                src={prod.image}
                alt={prod.name}
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{prod.name}</h3>
              <p className="text-gray-700">{prod.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-12 px-4 md:px-20">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
          <Image src="/images/ban.jpg" alt="Promotion" fill className="object-cover" />
         <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-2">Mega Sale!</h2>
            <p className="text-white text-lg md:text-2xl">Up to 50% off on selected items</p>
          </div>
        </div>
      </section>

    </div>
  );
}
