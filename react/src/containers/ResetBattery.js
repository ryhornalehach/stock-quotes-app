import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ResetBattery extends Component {
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
            <h4>How to reset a battery in Toyota Prius</h4>
            <ol>
              <li>Open the trunk
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_1.png' width='300' /></div>
              </li>
              <li>Lift and take off the floor mat from the trunk
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_2.png' width='300' /></div>
              </li>
              <li>Lift the floor panel and take it off your way
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_3.png' width='300' /> <img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_4.png' width='300' /></div>
              </li>
              <li>Lift and take off the whole compartment, you can lift it by the handle
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_5.png' width='300' /> <img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_6.png' width='300' /></div>
              </li>
              <li>On the right side you will see the the main battery, lift and take off the right side floor cover
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_7.png' width='300' /></div>
              </li>
              <li>If you see the red plastic cover on top of the battery - take it off
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_8.png' width='300' /> <img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_9.png' width='300' /></div>
              </li>
              <li>Unplug the main battery connector
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_10.png' width='300' /> <img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_11.png' width='300' /></div>
              </li>
              <li>You need to push a little pin on the bottom part of the connector to unplug it
                <div><img src='https://s3.amazonaws.com/transporter-app-development/infoblock/restart_12.png' width='300' /></div>
              </li>
              <li>Wait 3 minutes</li>
              <li>Plug the connector back in.</li>
              <li>Try to start the car</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default ResetBattery
