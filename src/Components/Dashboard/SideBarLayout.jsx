import { Link } from "react-router-dom";

const SideBarLayout = ({ children, currentView, setCurrentView }) => {
  const menuItems = [
    { name: "Home", value: "home", path: "/dashboard" },
    { name: "Users", value: "users", path: "/userdetails" },
    { name: "Current Location", value: "currentLocation", path: "/currentlocation" },
    { name: "Track Records", value: "trackrecords", path: "/trackrecords" },
    { name: "Sort by Date", value: "dateselector", path: "/dateselector" }
  ];

  return (
    <div className="flex min-h-screen text-gray-100 bg-gray-900">
      <div className="w-64 bg-gray-800 h-full p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item.value}>
                <Link to={item.path || "#"}>
                  <button
                    onClick={() => setCurrentView(item.value)}
                    className={`w-full text-left py-3 px-4 mb-2 font-semibold hover:bg-gray-700 rounded-lg ${
                      currentView === item.value
                        ? "bg-gray-700 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-grow p-8">
        {children}
      </div>
    </div>
  );
};

export default SideBarLayout;
