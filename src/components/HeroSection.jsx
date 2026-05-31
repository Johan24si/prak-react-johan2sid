import Button from "./Button";

export default function HeroSection({
  title = "Selamat Datang di MyApp",
  subtitle = "Platform terbaik untuk mengelola produk dan pelanggan Anda dengan mudah dan efisien.",
  primaryLabel = "Mulai Sekarang",
  secondaryLabel = "Pelajari Lebih Lanjut",
  onPrimary,
  onSecondary,
  image,
}) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={onPrimary}
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              {primaryLabel}
            </button>
            <button
              onClick={onSecondary}
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              {secondaryLabel}
            </button>
          </div>
        </div>

        {/* Image */}
        {image && (
          <div className="flex-1 flex justify-center">
            <img
              src={image}
              alt="Hero"
              className="w-full max-w-sm rounded-2xl shadow-2xl object-cover"
            />
          </div>
        )}

      </div>
    </section>
  );
}
