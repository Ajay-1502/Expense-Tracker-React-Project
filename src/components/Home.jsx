import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import ExpenseTracker from './ExpenseTracker';
import './Home.css';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
    localStorage.removeItem('token');
  };

  return (
    <>
      <div className="logout-container">
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
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
      <ExpenseTracker />
    </>
  );
};

export default Home;
