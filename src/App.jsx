import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import CurrentLocation from './Components/Dashboard/CurrentLocation';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import UserDetails from './Components/Dashboard/UserDetails';
import TrackRecords from './Components/Dashboard/TrackRecords';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/currentlocation" element={<CurrentLocation />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/trackrecords" element={<TrackRecords />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
