import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Users from '../components/Users';
import User from '../components/User';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Users} />
      <Route path="/user" component={User} />
    </Switch>
  </Router>
);

export default AppRouter;
