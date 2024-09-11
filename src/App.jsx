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
import UserRecordDetails from './Components/Dashboard/UserRecordDetails';
import DateSelector from './Components/Dashboard/DateSelector';
import RecordDetails from './Components/Dashboard/RecordDetails';

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
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/trackrecords" element={<TrackRecords />} />
          <Route path="/userrecord/:id" element={<UserRecordDetails />} />
          <Route path="/dateselector" element={<DateSelector />} />
          <Route path="/recorddetails" element={<RecordDetails />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
