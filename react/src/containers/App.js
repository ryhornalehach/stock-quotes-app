import React, { Component } from 'react';
import { Route, Switch, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Link } from 'react-router-dom';
import PickupsList from './PickupsList'
import InfoMainPage from './InfoMainPage'
import FlatTire from './FlatTire'
import ResetBattery from './ResetBattery'
import GeneralRules from './GeneralRules'
import MaintainingCars from './MaintainingCars'
import TowingInfo from '../components/TowingInfo'

const history = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/pickups' component={PickupsList} />
            <Route exact path='/information' component={InfoMainPage} />
            <Route exact path='/information/flattire' component={FlatTire} />
            <Route exact path='/information/resetbattery' component={ResetBattery} />
            <Route exact path='/information/generalrules' component={GeneralRules} />
            <Route exact path='/information/maintainingcars' component={MaintainingCars} />
            <Route exact path='/information/towinginfo' component={TowingInfo} />
          </Switch>
        </Router>
      </div>
    );
  };
};

export default App;
