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
import Login from './components/auth/Login';



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
          <Route path="/hotels" element={<Hotels />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="/destinations" element={<Destinations />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
