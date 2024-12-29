import { Link } from 'react-router-dom';
import './style.css'; 

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div  className='welcome'>
            <p>
                Welcome <br /> here you can find offers and make or check reservations
            </p>
            </div>

            <Link to="/offers">
            <div id='offers' style={{ width: "250px", rowGap: "0px",margin: 0 }} className="dashboard-item">
                <Link to="/offers">Offers</Link>
            </div>
            </Link>
            
            <Link to="/reservations">
            <div id='reservations' className="dashboard-item">
            <Link to="/reservations">Reservations</Link>
            </div>
            </Link>
            
        </div>
    );
};

export default Dashboard;
