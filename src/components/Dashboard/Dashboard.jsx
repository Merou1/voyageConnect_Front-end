import { Link } from 'react-router-dom';
import './style.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div  className='welcome'>
            <h3 className='Welcomh3'>
                Welcome <br /> here you can find offers and make or check reservations
            </h3>
            </div>

            <Link to="/client-offers">
            <div id='offers' style={{ width: "250px", rowGap: "0px",margin: 0 }} className="dashboard-item">
                <Link to="/client-offers">Offers</Link>
            </div>
            </Link>
            
            <Link to="/client-reservations">
            <div id='reservations' className="dashboard-item">
            <Link to="/client-reservations">Reservations</Link>
            </div>
            </Link>
            
        </div>
    );
};

export default Dashboard;
