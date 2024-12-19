import { Link } from 'react-router-dom';
import './style.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div id='flights' className="dashboard-item">
                <Link to="/flights">Flights</Link>
            </div>
            <div id='hotels' className="dashboard-item">
                <Link to="/hotels">Hotels</Link>
            </div>
            <div id='offers' className="dashboard-item">
                <Link to="/offers">Offers</Link>
            </div>
            <div id='destinations' className="dashboard-item">
                <Link to="/destinations">Destinations</Link>
            </div>
        </div>
    );
};

export default Dashboard;
