import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MaintainingCars extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {

    return(
      <div>
        <div className="row">
          <div className="col s12">
            <h4>Maintaining the company’s car</h4>
            <ol>
              <li><p><b>All drivers have to keep their vehicles clean.</b></p>
              <p>Perform vacuum cleaning at least once every month. You can find a free vacuum at a gas station near the office - (Prestige Car Wash & Gas. 925 Turnpike St, Canton, MA 02021)</p>
              <p>Don’t leave any trash in the car. You have to get rid of all trash every day. No papers, bottles or packaging allowed laying in the car at any time!</p></li>

              <li><p><b>All drivers are required to check the oil level regularly.</b></p>
              <p>Check the oil level every week. The cars are not new and some of them can consume motor oil. Not checking the oil level may lead to a serious brake of the car.</p>
              <p>If a red circle with exclamation sign appears on the dashboard - that means the oil level is low. Please check the oil level ASAP. Stop at the nearest gas station and buy 1 quart of synthetic motor oil (5w30). Pour it in the motor.</p></li>

              <li><p><b>All drivers have to be able to change the tire in case of a sudden flat tire.</b></p>
              <p>All drivers have to be familiar with the procedures required to change the tire. Under normal circumstances drivers should be able to change the tire.</p>
              <p>In most cases flat tire wouldn’t happen if you keep an eye on the tires.</p>
              <p>All drivers have to check the visible condition of the tires every day!</p>
              <p>If the air is leaking in any tire, let the dispatcher know. Pump air in this tire at the nearest gas station ASAP.</p></li>

              <li><p><b>All drivers have to know the procedure how to reset car’s battery.</b></p>
              <p>In case if your car stuck and won’t turn on</p>
              <p>In case if all lights on the dashboard are suddenly turned on</p>
              <p>In case if the car is not turning into drive mode</p>
              <p>In this cases you might need to reset the main battery. Tell the dispatcher what’s going on and be ready to reset the battery.</p></li>

              <li><p><b>All drivers have to check the outside condition of the car.</b></p>
              <p>Check for any dents, scratches, bumps on the car. If any new dent or scratch appears on your car, report it right away.</p></li>

              <li><p><b>Smoking is prohibited in the car.</b></p>
              <p>If your car smells like you were smoking inside - you will be responsible for the full interior detailing cost.</p>
              <p>If your car smells like marijuana smoke - you will be sent to a drug test with possible employment termination.</p></li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default MaintainingCars
