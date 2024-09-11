import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SideBarLayout from "./SideBarLayout";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import Calendar from 'react-calendar'; 

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const getRecordTypeProps = (type) => {
  if (type === "CheckIn") {
    return { color: "text-green-400", emoji: "⬆️" }; 
  } else if (type === "CheckOut") {
    return { color: "text-red-400", emoji: "⬇️" }; 
  }
  return { color: "text-gray-300", emoji: "🔄" }; 
};

const UserRecordDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { userName } = state || {};
  const [records, setRecords] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyHours, setDailyHours] = useState({});

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/record/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: id }),
        });
        const data = await response.json();
        setRecords(data);

        const dailyHours = {};
        const calData = {};
        data.forEach(record => {
          const date = new Date(record.time).toLocaleDateString('fr-CA');
          if (!dailyHours[date]) dailyHours[date] = 0;
          dailyHours[date]++;
          
          if (calData[date]) {
            calData[date].push(record);
          } else {
            calData[date] = [record];
          }
        });

        const workingHours = {};
        for (const date in calData) {
          workingHours[date] = calculateWorkingHours(calData[date]);
        }
        setCalendarData(workingHours);
        setDailyHours(workingHours);

        const labels = Object.keys(dailyHours);
        const values = labels.map(label => workingHours[label]?.split('h')[0] || 0); 
        setChartData({
          labels,
          datasets: [
            {
              label: 'Working Hours per Day',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }
          ],
        });

      } catch (error) {
        console.error("Error fetching user records:", error);
      }
    };

    fetchRecord();
  }, [id]);

  const calculateWorkingHours = (data) => {
    const checkIns = data.filter(event => event.type === 'CheckIn').sort((a, b) => new Date(a.time) - new Date(b.time));
    const checkOuts = data.filter(event => event.type === 'CheckOut').sort((a, b) => new Date(a.time) - new Date(b.time));

    if (checkIns.length > checkOuts.length) {
      const lastCheckInDate = new Date(checkIns[checkIns.length - 1].time);
      const currentDate = new Date();
      if (
        lastCheckInDate.getFullYear() !== currentDate.getFullYear() ||
        lastCheckInDate.getMonth() !== currentDate.getMonth() ||
        lastCheckInDate.getDate() !== currentDate.getDate()
      ) {
        const endOfDay = new Date(lastCheckInDate);
        endOfDay.setHours(23, 59, 59, 999);
        checkOuts.push({
          time: endOfDay.toISOString()
        });
      } else {
        checkOuts.push({
          time: currentDate.toISOString()
        });
      }
    }

    let totalWorkingMilliseconds = 0;

    for (let i = 0; i < checkIns.length && i < checkOuts.length; i++) {
      const checkInTime = new Date(checkIns[i].time).getTime();
      const checkOutTime = new Date(checkOuts[i].time).getTime();

      if (checkOutTime > checkInTime) {
        totalWorkingMilliseconds += checkOutTime - checkInTime;
      }
    }

    const totalWorkingHours = Math.floor(totalWorkingMilliseconds / (1000 * 60 * 60));
    const totalWorkingMinutes = Math.floor((totalWorkingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${totalWorkingHours}h ${totalWorkingMinutes}m`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <SideBarLayout currentView="user-record-details">
      <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <div className="flex-grow p-8 text-gray-100">
          <h1 className="text-4xl font-bold mb-4">
            {userName ? `${userName}'s Records` : "User Records"}
          </h1>
          <hr className="border-t-2 border-gray-500 w-full mb-8" />
          <div className="w-full max-w-4xl mx-auto shadow-lg p-6">
            <div className="mb-8">
              {/* Display Calendar */}
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date, view }) => (calendarData[date.toLocaleDateString('fr-CA')] ? 'bg-blue-500 text-white' : null)}
                tileContent={({ date }) => {
                  const dateStr = date.toLocaleDateString('fr-CA');
                  const hours = calendarData[dateStr];
                  return hours ? (
                    <div className="text-xs text-white">
                      {hours}
                    </div>
                  ) : null;
                }}
              />
              <p className="mt-4 text-lg text-gray-300">
                {calendarData[selectedDate.toLocaleDateString('fr-CA')] || 'No records for this date.'}
              </p>
            </div>
            <div className="mb-8">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <table className="min-w-full table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="py-2 px-4 border border-gray-500">Location</th>
                  <th className="py-2 px-4 border border-gray-500">Longitude</th>
                  <th className="py-2 px-4 border border-gray-500">Latitude</th>
                  <th className="py-2 px-4 border border-gray-500">Type</th>
                  <th className="py-2 px-4 border border-gray-500">Time</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const { color, emoji } = getRecordTypeProps(record.type);
                  return (
                    <tr key={record._id} className="bg-gray-900 text-gray-300">
                      <td className="py-2 px-4 border border-gray-500">{record.location.name}</td>
                      <td className="py-2 px-4 border border-gray-500">{record.location.longitude}</td>
                      <td className="py-2 px-4 border border-gray-500">{record.location.latitude}</td>
                      <td className={`py-2 px-4 border border-gray-500 ${color}`}>
                        {emoji} {record.type}
                      </td>
                      <td className="py-2 px-4 border border-gray-500">{new Date(record.time).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideBarLayout>
  );
};

export default UserRecordDetails;
