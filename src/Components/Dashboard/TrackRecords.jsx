import { useState, useEffect } from "react";
import SideBarLayout from "./SideBarLayout";

const TrackRecords = () => {
  const [trackRecords, setTrackRecords] = useState([]);
  const [currentView, setCurrentView] = useState("trackrecords");

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
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      {/* <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <h1 className="text-4xl font-bold mb-4">Track Records</h1>
        <hr className="border-t-2 border-gray-500 w-full mb-8" />
        <div className="overflow-x-auto w-full max-w-4xl mx-auto">
          <table className="min-w-full bg-gray-800 shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-700 text-gray-300">User ID</th>
                <th className="py-2 px-4 bg-gray-700 text-gray-300">User Name</th>
                <th className="py-2 px-4 bg-gray-700 text-gray-300">Location</th>
                <th className="py-2 px-4 bg-gray-700 text-gray-300">Type</th>
                <th className="py-2 px-4 bg-gray-700 text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {trackRecords.map((record, index) => (
                <tr key={index} className="text-center bg-gray-900 border-b border-gray-700">
                  <td className="py-2 px-4">{record.userId}</td>
                  <td className="py-2 px-4">{record.userName}</td>
                  <td className="py-2 px-4">{record.location}</td>
                  <td className="py-2 px-4">{record.type}</td>
                  <td className="py-2 px-4">{new Date(record.time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </SideBarLayout>
  );
};

export default TrackRecords;
