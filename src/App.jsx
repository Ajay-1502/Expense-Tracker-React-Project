import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import CompleteProfile from './components/CompleteProfile';
import PasswordReset from './components/PasswordReset';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      style={{ minHeight: '100vh' }}
      className={theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}
    >
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/password-reset" component={PasswordReset} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/complete-profile" component={CompleteProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
