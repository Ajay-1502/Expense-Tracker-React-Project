import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="banner">
        <p>
          <span className="incomplete">You can update your profile.</span>
          <Link to="/complete-profile" className="complete-now">
            Update My Profile
          </Link>
        </p>
      </div>
      <h1 className="welcome-text">
        👋 Welcome to <span className="brand-name">Expense Tracker</span> 💰
      </h1>
      <p className="subtitle">
        Track, manage, and control your expenses like a pro!
      </p>
    </div>
  );
};

export default Home;
