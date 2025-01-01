import './App.css'
import Register from "./components/auth/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Dashboard from './components/Dashboard/Dashboard';
import AdminDashboard from './components/Dashboard/Admin-dashboard';
import Flights from './components/Flights/Flights';
import Hotels from './components/Hotels/Hotels';
import Offers from './components/Offers/Offers';
import Destinations from './components/Destinations/Destinations';
import Reservations from './components/Reservations/Reservations'
import Login from './components/auth/Login';
import AddFlight from './components/Flights/AddFlight';
import UpdateFlight from './components/Flights/UpdateFlight';
import AddHotel from './components/Hotels/AddHotel';
import UpdateHotel from './components/Hotels/UpdateHotel';
import OneHotel from './components/Hotels/OneHotel';
import OneOffer from './components/Offers/OneOffer';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="/flights" element={<Flights />}/>
          <Route path="/flights/add" element={<AddFlight />}/>
          <Route path="/flights/update/:flightId" element={<UpdateFlight />}/>
          <Route path="/hotels" element={<Hotels />}/>
          <Route path="/hotels/add" element={<AddHotel />}/>
          <Route path="/hotels/update/:hotelId" element={<UpdateHotel />}/>
          <Route path="/hotels/:id" element={<OneHotel />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="/offers/:id" element={<OneOffer />}/>
          <Route path="/destinations" element={<Destinations />}/>
          <Route path="/reservations" element={<Reservations />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
