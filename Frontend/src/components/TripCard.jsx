function TripCard({ title, days, budget }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg hover:scale-105 transition">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        className="h-40 w-full object-cover rounded-xl"
      />

      <h2 className="text-xl font-bold mt-3">{title}</h2>

      <div className="flex justify-between mt-2 text-gray-600">
        <p>{days} Days</p>
        <p>₹{budget}</p>
      </div>
    </div>
  );
}

export default TripCard;