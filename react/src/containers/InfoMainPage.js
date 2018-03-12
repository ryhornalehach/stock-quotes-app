import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoMainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
  }

  render() {

    return(
      <div>
        <div className="row">
          <div className="col s12">
            <h4>Information block</h4>
            <ul>
              <li><a href='./information/flattire'>How to change a flat tire</a></li>
              <li><a href='./information/resetbattery'>How to reset a battery in Toyota Prius</a></li>
              <li><a href='./information/maintainingcars'>Maintaining the cars</a></li>
              <li><a href='./information/generalrules'>General rules and procedures</a></li>
              <li><a href='./information/towinginfo'>Towing information</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoMainPage
