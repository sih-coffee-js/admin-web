import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          email,
          password
        }
      );
      console.log(data);
      if (data.success && data.role == "Admin") {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Access denied: Admins only.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black bg-[url(https://gegosoft.com/wp-content/uploads/2021/03/student_attendance_app.jpg)] bg-cover">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-sm mb-[220px]">
        <h2 className="text-2xl font-bold mb-4">Geo Track</h2>
        <h3 className="text-xl mb-6">Admin Console</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-400 text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-400 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
