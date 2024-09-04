import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import CurrentLocation from './Components/Dashboard/CurrentLocation';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/currentlocation" element={<CurrentLocation />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
