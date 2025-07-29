import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CompleteProfile from './components/CompleteProfile';
import PasswordReset from './components/PasswordReset';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/password-reset" component={PasswordReset} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/complete-profile" component={CompleteProfile} />
      </Switch>
    </Router>
  );
}

export default App;
