import { useState, useEffect } from "react";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();

        // Filter out the password field from each user object
        const filteredUsers = data.map(({ password, ...rest }) => rest);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-4">Users</h1>
      <hr className="border-t-2 border-gray-300 w-full mb-8" />
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white mx-auto shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Emp ID</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Employee Name</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Email</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Role</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Google Sign-In</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b border-gray-200">{user._id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.fullName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.isGoogleSignin ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
