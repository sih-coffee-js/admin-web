import { useState, useEffect } from "react";
import SideBarLayout from "./SideBarLayout";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("users");

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
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <div className="flex-grow p-8 text-gray-100">
          <h1 className="text-4xl font-bold mb-4">Users</h1>
          <hr className="border-t-2 border-gray-500 w-full mb-8" />
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-gray-800 shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300">
                    Emp ID
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300">
                    Employee Name
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300">Email</th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300">Role</th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300">
                    Google Sign-In
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="text-center bg-gray-900 border-b border-gray-700"
                  >
                    <td className="py-2 px-4">{user._id}</td>
                    <td className="py-2 px-4">{user.fullName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      {user.isGoogleSignin ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default UserDetails;
