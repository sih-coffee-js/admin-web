import { useState } from 'react';
import axios from 'axios';
import SideBarLayout from './SideBarLayout'; 

const getRecordTypeEmoji = (type) => {
  if (type === "CheckIn") {
    return <span style={{ color: 'green' }}>⬆️ CheckIn</span>; 
  } else if (type === "CheckOut") {
    return <span style={{ color: 'red' }}>⬇️ CheckOut</span>;
  }
  return <span>🔄 Other</span>; 
};

const DateSelector = () => {
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('dateSelector'); 

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/record/getalldate', {
        date: date,
      });
      setRecords(response.data);
    } catch (err) {
      setError('Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <div className="flex-grow p-8 text-gray-100 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">Select Date to Fetch Records</h2>
          <hr className="border-t-2 border-gray-500 w-full mb-8" />
          <div className="bg-gray-800 shadow-lg p-6 rounded-lg">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="py-2 px-4 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              />
              <button
                onClick={fetchRecords}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Fetch Records
              </button>
            </div>
            
            {loading && <p className="text-center text-gray-300">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {!loading && !error && records.length > 0 && (
              <div className="overflow-x-auto w-full max-w-4xl">
                <table className="min-w-full bg-gray-800 shadow-lg table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">User Full Name</th>
                      <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">Location</th>
                      <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">Type</th>
                      <th className="py-2 px-4 bg-gray-700 text-gray-300 border border-gray-500">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={index} className="text-center bg-gray-900 border-b border-gray-700">
                        <td className="py-2 px-4 border border-gray-500">{record.user.fullName}</td>
                        <td className="py-2 px-4 border border-gray-500">{record.location.name}</td>
                        <td className="py-2 px-4 border border-gray-500">
                          {getRecordTypeEmoji(record.type)}
                        </td>
                        <td className="py-2 px-4 border border-gray-500">{new Date(record.time).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default DateSelector;
