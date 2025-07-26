import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CompleteProfile from './components/CompleteProfile';
import PasswordReset from './components/PasswordReset';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/password-reset" component={PasswordReset} />
        <Route path="/home" component={Home} />
        <Route path="/complete-profile" component={CompleteProfile} />
      </Switch>
    </Router>
  );
}

export default App;
