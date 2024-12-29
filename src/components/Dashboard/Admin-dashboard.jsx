import { Link } from 'react-router-dom';
import './style.css'; 

const AdminDashboard = () => {
    return(
        <div className="dashboard">

        <Link to="/flights">     
        <div id='flights' style={{ width: "200px", rowGap: "0px",margin: 5 }} className="dashboard-item">
            <Link to="/flights">Flights</Link>
        </div>
        </Link>

        <Link to="/hotels">
        <div id='hotels' style={{ width: "200px", rowGap: "0px",margin: 5 }} className="dashboard-item">
            <Link to="/hotels">Hotels</Link>
        </div>
        </Link>

        <Link to="/offers">
        <div id='offers' style={{ width: "200px", rowGap: "0px",margin: 5 }} className="dashboard-item">
            <Link to="/offers">Offers</Link>
        </div>
        </Link>

        <Link to="/destinations">
        <div id='destinations' style={{ width: "200px", rowGap: "0px",margin: 5 }} className="dashboard-item">
            <Link to="/destinations">Destinations</Link>
        </div>
        </Link>

    </div>    
    )
}
export default AdminDashboard;