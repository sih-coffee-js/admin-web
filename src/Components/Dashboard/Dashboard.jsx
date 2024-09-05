import { useState} from "react";
import SideBarLayout from "./SideBarLayout";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("home");


  return (
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === "home" && (
        <>
          <div className="flex-grow p-8 text-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
          </div>          
        </>
      )}
    </SideBarLayout>
  );
};

export default Dashboard;
