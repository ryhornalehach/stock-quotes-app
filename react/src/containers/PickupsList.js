import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PickupIndexTile from './PickupIndexTile'
import InfoText from '../components/InfoText'
import SpecialCase from '../components/SpecialCase'

class PickupsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickups: [],
      userAddress: ''
    }
  }

  componentDidMount() {
    // read the current driver's pickups
    fetch('/api/v1/pickups',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
        this.setState({ pickups: body.pickups, userAddress: body.user_address })
    })
  }

  render() {
    let listOfPickups, cardClassName, togetherClassName, infoText, specialCase;
    let groupStatus = 0;

    if (this.state.pickups.length > 0 && this.state.pickups[0][3].toLowerCase() != 'vse' && this.state.pickups[0][3].toLowerCase() != 'break') {
      infoText = <InfoText
                    text='My clients:'
                  />
      this.state.pickups.forEach((pickup) => {
        if (pickup[0].includes("picked up")) {
          groupStatus += 1;
        }
      })
      if (this.state.pickups.length == 1 || groupStatus === this.state.pickups.length) {
        groupStatus = 'ok'  // showing drop off address if all clients has been picked up
      }

      listOfPickups = this.state.pickups.map ((pickup, index) => {
        if (pickup.length < 13) { // checking if not all cells were filled
          while (pickup.length < 13) {
            pickup.push('') // checking for special case where not all cells are filled (like going to oil change, etc.)
          }
        }

        if (index == 0) {
          return(
            <PickupIndexTile
              key={index}
              pickup={pickup}
              cardClassName={cardClassName}
              groupStatus={groupStatus}
            />
          )
        } else if (pickup[6].includes("together") || pickup[6].includes("tog/")) {
          togetherClassName = 'orange lighten-2'
          return(
            <PickupIndexTile
              key={index}
              pickup={pickup}
              cardClassName={cardClassName}
              togetherClassName={togetherClassName}
              groupStatus={groupStatus}
            />
          )
        } else {
          cardClassName = 'invisible'
        }

      })
    } else if (this.state.pickups.length > 0 && this.state.pickups[0][3].toLowerCase() == 'vse') {
          infoText = <InfoText
                        text='That`s it for today, thank you!'
                        tag='h4'
                      />
          specialCase = <SpecialCase
                          navigate='Navigate home: '
                          text={this.state.userAddress}
                          keyWord='vse'
                        />
    } else if (this.state.pickups.length > 0 && this.state.pickups[0][3].toLowerCase() == 'break') {
          infoText = <InfoText
                        text='You will have break now, thank you!'
                        tag='h4'
                      />
          specialCase = <SpecialCase
                          navigate='Navigate home: '
                          text={this.state.userAddress}
                          keyWord='break'
                        />
    }
    else {
      infoText = <InfoText
                    text='No client info. Contact dispatcher please. 1-617-982-3823'
                  />
    }


    return(
      <div>
        <div className="row">
          <div className='col s12'>
            {infoText}
            {listOfPickups}
            {specialCase}
          </div>
        </div>
      </div>
    )
  }
}

export default PickupsList
