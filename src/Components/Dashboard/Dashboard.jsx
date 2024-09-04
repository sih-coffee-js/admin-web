import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h1>
      <div className="space-x-4">
        <Link
          to="/currentlocation"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Current Location
        </Link>
        <Link
          to="/profile"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
