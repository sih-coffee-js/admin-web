import { useState, useEffect } from "react";

const Dashboard = () => {
  const [trackRecords, setTrackRecords] = useState([]);

  useEffect(() => {
    // Fetch track records from the API
    const fetchTrackRecords = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/track");
        const data = await response.json();

        // Set track records state
        setTrackRecords(data);
      } catch (error) {
        console.error("Error fetching track records:", error);
      }
    };

    fetchTrackRecords();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-4">Track Records</h1>
      <hr className="border-t-2 border-gray-300 w-full mb-8" />
      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white mx-auto shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">User ID</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">User Name</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Location</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Type</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {trackRecords.map((record, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b border-gray-200">{record.userId}</td>
                <td className="py-2 px-4 border-b border-gray-200">{record.userName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{record.location}</td>
                <td className="py-2 px-4 border-b border-gray-200">{record.type}</td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(record.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
