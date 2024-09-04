import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Welcome Admin</h1>
        <p className="text-lg mb-6">Please click the button below to login to your admin console:</p>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg transition-colors duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
