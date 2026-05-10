import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-sky-500">
        Traveloop
      </h1>

      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-trip">Create Trip</Link>
        <Link to="/itinerary">Itinerary</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;