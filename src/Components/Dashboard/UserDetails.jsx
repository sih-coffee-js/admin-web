import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarLayout from "./SideBarLayout";

const formatWorkingHours = (time) => {
  if (!time) return "_ H _ M";
  const [hours, minutes] = time.split(":");
  return `${hours} H ${minutes} M`;
};

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("users");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();

        const filteredUsers = data.map(({ password, ...rest }) => rest);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (userId, userName) => {
    try {
      const response = await fetch("http://localhost:8000/api/record/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      navigate(`/userrecord/${userId}`, { state: { userName } }); 
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  return (
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <div className="flex-grow p-8 text-gray-100">
          <h1 className="text-4xl font-bold mb-4">Users</h1>
          <hr className="border-t-2 border-gray-500 w-full mb-8" />
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-gray-800 shadow-lg table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Emp ID
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Employee Name
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Email
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Role
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Google Sign-In
                  </th>
                  <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">
                    Working Hour
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="text-center bg-gray-900 border-b border-gray-700 cursor-pointer"
                    onClick={() => handleUserClick(user._id, user.fullName)}
                  >
                    <td className="py-2 px-4 border border-gray-500">
                      {user._id}
                    </td>
                    <td className="py-2 px-4 border border-gray-500">
                      {user.fullName}
                    </td>
                    <td className="py-2 px-4 border border-gray-500">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border border-gray-500">
                      {user.role}
                    </td>
                    <td className="py-2 px-4 border border-gray-500">
                      {user.isGoogleSignin ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border border-gray-500">
                      {formatWorkingHours(user.working)}
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
