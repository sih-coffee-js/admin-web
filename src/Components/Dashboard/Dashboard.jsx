import { useState} from "react";
import SideBarLayout from "./SideBarLayout";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("users");

  return (
    <SideBarLayout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === "users" }
    </SideBarLayout>
  );
};

export default Dashboard;
