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
import OneOffer from './components/Offers/OneOffer';
import OneFlight from './components/Flights/OneFlight';
import OneHotel from './components/Hotels/OneHotlel';
import UpdateOffer from './components/Offers/updateOffer';
import AddOffer from './components/Offers/AddOffer';
import AddDestination from './components/Destinations/AddDestination';
import UpdateDestination from './components/Destinations/UpdateDestination';
import OneDestination from './components/Destinations/OneDestination';






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
          <Route path="/flights/:id" element={<OneFlight />} />
          <Route path="/hotels" element={<Hotels />}/>
          <Route path="/hotels/add" element={<AddHotel />}/>
          <Route path="/hotels/update/:hotelId" element={<UpdateHotel />}/>
          <Route path="/hotels/:id" element={<OneHotel />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="/offers/add" element={<AddOffer />}/>
          <Route path="/offers/:id" element={<OneOffer />}/>
          <Route path="/offers/update/:offerId" element={<UpdateOffer />}/>
          <Route path="/destinations" element={<Destinations />}/>
          <Route path="/destinations/add" element={<AddDestination />} />
          <Route path="/destinations/update/:id" element={<UpdateDestination />} />
          <Route path="/destinations/:id" element={<OneDestination />} />         
          <Route path="/reservations" element={<Reservations />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
