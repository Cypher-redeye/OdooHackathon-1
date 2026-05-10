import Navbar from "../components/Navbar";

function Itinerary() {
  return (
    <div>
      <Navbar />

      <div className="p-8">

        <h1 className="text-4xl font-bold mb-8">
          Itinerary Builder
        </h1>

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-2xl font-bold">
              Day 1 - Mumbai
            </h2>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>📍 Gateway of India</li>
              <li>📍 Marine Drive</li>
              <li>📍 Colaba Causeway</li>
            </ul>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-2xl font-bold">
              Day 2 - Goa
            </h2>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li>🏖 Baga Beach</li>
              <li>🌅 Sunset Cruise</li>
              <li>🍽 Seafood Dinner</li>
            </ul>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Itinerary;