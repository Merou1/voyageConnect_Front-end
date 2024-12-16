import './App.css'
import Register from "./components/auth/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';




function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
