export default function FeatureSection({
  title = "Fitur Unggulan",
  subtitle = "Semua yang kamu butuhkan tersedia dalam satu platform.",
  features = [],
}) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
