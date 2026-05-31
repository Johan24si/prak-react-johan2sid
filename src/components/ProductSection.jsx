import ProductCard from "./ProductCard";

export default function ProductSection({
  title = "Produk Terbaru",
  subtitle = "Temukan produk pilihan terbaik kami.",
  products = [],
}) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
