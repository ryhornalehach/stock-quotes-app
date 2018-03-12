import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import ConfirmButton from '../components/ConfirmButton'
import CancelConfirmButton from '../components/CancelConfirmButton'
import SpecialComment from '../components/SpecialComment'

class PickupIndexTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickupStatus: this.props.pickup[0],
      groupStatus: this.props.groupStatus
    }
    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleNoShowButton = this.handleNoShowButton.bind(this);
    this.handleArrivalButton = this.handleArrivalButton.bind(this);
    this.handlePickUpButton = this.handlePickUpButton.bind(this);
    this.handleDropOffButton = this.handleDropOffButton.bind(this);
    this.handleAddressLink = this.handleAddressLink.bind(this);
    this.handlePhoneLink = this.handlePhoneLink.bind(this);
  }

  handleDropOffButton(event) {
    event.preventDefault()
    if (confirm("Please confirm drop off") == true) {
        let currentTime = new Date().toLocaleString();  // getting the current time of the button press event
        this.setState({ pickupStatus: 'dropped off'})
        // Update spreadsheet with 'drop off' status for the client
        fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: 'dropped off', currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells.updated_cells === 1) { // if the cell was updated
            console.log('Clients status was successfully updated')
          } else {
            console.log('Error in updating the clients status')
            console.log(body)
            this.setState({ pickupStatus: this.props.pickup[0] })
          }
          location.reload();
        })
    }
  }

  handlePickUpButton(event) {
    event.preventDefault()
    if (confirm("Please confirm pick up") == true) {
        let currentTime = new Date().toLocaleString();  // getting the current time of the button press event
        this.setState({ pickupStatus: 'picked up'})
        // Update spreadsheet with 'picked up' status for the client
        fetch(`/api/v1/pickups/1`, {
            method: 'PATCH',   // PATCH method for updating the entry
            credentials: "same-origin",
            body: JSON.stringify({ newStatus: 'picked up', currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
          })
          .then(response => response.json())
          .then(body =>{
            if (body.updated_cells.updated_cells === 1) { // if the cell was updated
              console.log('Clients status was successfully updated')
            } else {
              console.log('Error in updating the clients status')
              console.log(body)
              this.setState({ pickupStatus: this.props.pickup[0] })
            }
          })
          if (this.props.groupStatus != 'ok') {
            setTimeout(function(){ location.reload(); }, 1500);
          }
      }
  }

  handleArrivalButton(event) {
    event.preventDefault()
    if (confirm("Please confirm arrival at client's location") == true) {
        let currentTime = new Date().toLocaleString();  // getting the current time of the button press event
        this.setState({ pickupStatus: 'arrived'})
        // Update spreadsheet with 'arrived' status for the client
        fetch(`/api/v1/pickups/1`, {
            method: 'PATCH',   // PATCH method for updating the entry
            credentials: "same-origin",
            body: JSON.stringify({ newStatus: 'arrived', currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
          })
          .then(response => response.json())
          .then(body =>{
            if (body.updated_cells.updated_cells === 1) { // if the cell was updated
              console.log('Clients status was successfully updated')
            } else {
              console.log('Error in updating the clients status')
              console.log(body)
              this.setState({ pickupStatus: this.props.pickup[0] })
            }
          })
      }
  }

  handleCancelButton(event) {
    event.preventDefault()
    let cancelReport = prompt("Please enter the details of the cancellation\ne.g. No Show/ Cancel upon arrival, etc.", "");
    if (cancelReport != null ) {
        let currentTime = new Date().toLocaleString();  // getting the current time of the button press event
        let newStatus = `cancelled "${cancelReport}"`
        this.setState({ pickupStatus: 'cancelled'})
        // Update spreadsheet with 'cancelled' status for the client
        fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: newStatus, currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells.updated_cells === 1) { // if the cell was updated
            console.log('Clients status was successfully updated')
          } else {
            console.log('Error in updating the clients status')
            console.log(body)
            this.setState({ pickupStatus: this.props.pickup[0] })
          }
          location.reload();
        })
    }
  }

  handleNoShowButton(event) {
    event.preventDefault()
    let cancelReport = prompt("Please enter the details of the cancellation\ne.g. Called 5 times, no answer, waited 15 minutes, no signs of client", "");
    if (cancelReport != null ) {
        let currentTime = new Date().toLocaleString();  // getting the current time of the button press event
        let newStatus = `no show "${cancelReport}"`
        this.setState({ pickupStatus: 'no show'})
        // Update spreadsheet with 'cancelled' status for the client
        fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: newStatus, currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells.updated_cells === 1) { // if the cell was updated
            console.log('Clients status was successfully updated')
          } else {
            console.log('Error in updating the clients status')
            console.log(body)
            this.setState({ pickupStatus: this.props.pickup[0] })
          }
          location.reload();
        })
    }
  }

  handleAddressLink(event) {
      let currentTime = new Date().toLocaleString();  // getting the current time of the link press event
      // Update spreadsheet with 'navigating to' status for the client
      fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: `navigating to "${event.target.innerText}"`, currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells.updated_cells === 1) { // if the cell was updated
            console.log('Clients status was successfully updated')
          } else {
            console.log('Error in updating the clients status')
            console.log(body)
          }
        })
  }

  handlePhoneLink(event) {
      let currentTime = new Date().toLocaleString();  // getting the current time of the link press event
      // Update spreadsheet with 'navigating to' status for the client
      fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: `calling "${event.target.innerText}"`, currentClientName: this.props.pickup[7], currentClientPickupTime: this.props.pickup[3], currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells.updated_cells === 1) { // if the cell was updated
            console.log('Clients status was successfully updated')
          } else {
            console.log('Error in updating the clients status')
            console.log(body)
          }
        })
  }

  render() {
    let addressInformation, addressLink, addressText, cardClassName, confirmButton, specialComments, pleasePickupGroup, additionalPhones;
    let specialCommentsText = [];
    let comments = this.props.pickup[6].toLowerCase();

    let cancelButton = <CancelConfirmButton
                          text='Client Cancel'
                          handleButton={this.handleCancelButton}
                      />
    let noShowButton = <CancelConfirmButton
                          text='Client NoShow'
                          handleButton={this.handleNoShowButton}
                      />

    if (this.state.pickupStatus.includes('picked up')) {
        if (this.state.groupStatus == 'ok') {
          addressText = 'Drop off address: '
          addressInformation = `${this.props.pickup[11]}, ${this.props.pickup[12]}`;
          confirmButton = <ConfirmButton
                            text='Confirm Drop Off'
                            handleButton={this.handleDropOffButton}
                        />
        } else {
          pleasePickupGroup = 'Please pickup all clients in the group';
          addressInformation = null;
          confirmButton = null;
        }
        addressLink = `https://www.google.com/maps/place/${addressInformation}`
        noShowButton = null;
        cancelButton = null;
    } else if (this.state.pickupStatus.includes('dropped off')) {
        addressText = 'Client was successfully dropped off';
        addressInformation = null;
        addressLink = null;
        confirmButton = null;
        cancelButton = null;
        noShowButton = null;
    } else if (this.state.pickupStatus.includes('cancelled')) {
        addressText = 'Client has cancelled the ride';
        addressInformation = null;
        addressLink = null;
        confirmButton = null;
        cancelButton = null;
        noShowButton = null;
    } else if (this.state.pickupStatus.includes('no show')) {
        addressText = 'Client didnt show up';
        addressInformation = null;
        addressLink = null;
        confirmButton = null;
        cancelButton = null;
        noShowButton = null;
    } else if (this.state.pickupStatus.includes('arrived')) {
        addressText = 'Pick up address: '
        addressInformation = `${this.props.pickup[9]}, ${this.props.pickup[10]}`;
        addressLink = `https://www.google.com/maps/place/${addressInformation}`
        confirmButton = <ConfirmButton
                            text='Confirm Pick Up'
                            handleButton={this.handlePickUpButton}
                        />
    } else {
        addressText = 'Pick up address: '
        addressInformation = `${this.props.pickup[9]}, ${this.props.pickup[10]}`;
        addressLink = `https://www.google.com/maps/place/${addressInformation}`
        confirmButton = <ConfirmButton
                            text='Confirm Arrival'
                            handleButton={this.handleArrivalButton}
                        />
        noShowButton = null;
    }

    cardClassName = `card ${this.props.cardClassName}`

    if (this.props.pickup[7] != null && this.props.pickup[7] != '' && this.props.pickup[7][0] == '*') {   // Checking for DDS clients
        specialCommentsText.push('Do not leave client alone!')
    }
    if (comments != null && comments != '') {
        if (comments.includes('alone') || comments.includes('(a)') || comments.includes('a/')) {
          specialCommentsText.push('Transport alone. Separate and direct ride.')
        }
        if (comments.includes('1 esc') || comments.includes('(1)') || comments.includes('1/') || comments.includes('1esc')) {
          specialCommentsText.push('1 escort')
        } else if (comments.includes('2 esc') || comments.includes('(2)') || comments.includes('2/') || comments.includes('2esc')) {
          specialCommentsText.push('2 escorts')
        } else if (comments.includes('3 esc') || comments.includes('(3)') || comments.includes('3/') || comments.includes('3esc')) {
          specialCommentsText.push('3 escorts')
        }

        let phoneRegex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/g   // regular expression for phone numbers, flag 'g' - for multiple entrys
        if (this.props.pickup[6].match(phoneRegex) != null) {
          let phoneNumbers = this.props.pickup[6].match(phoneRegex)
          additionalPhones = phoneNumbers.map ((phone, index) => {
            return (
              <a href={`tel://1-${phone}`} onClick={this.handlePhoneLink} key={index}>; {phone}</a>
            )
          })
        }
    }
    specialComments = specialCommentsText.map ((comment, index) => {
      return(
              <SpecialComment
                  text={comment}
                  key={index}
              />
            )
    })

    return(
      <div className={cardClassName}>
        <div className="col s12">
            <div className="card-content">
              <p><b>Pickup time:</b> {this.props.pickup[3]}</p>
              <p><b>Appointment time:</b> {this.props.pickup[4]}</p>
              <p className={this.props.togetherClassName}><b>Comments: </b>{this.props.pickup[6]}</p>
              {specialComments}
              <p><b>Name: </b>{this.props.pickup[7]}</p>
              <p><b>Phone: </b><a href={`tel://1-${this.props.pickup[8]}`} onClick={this.handlePhoneLink}>{this.props.pickup[8]}</a> {additionalPhones}</p>
              <p><b>{addressText}</b><a href={addressLink} onClick={this.handleAddressLink}>{addressInformation}</a>{pleasePickupGroup}</p>
              {confirmButton}
              {cancelButton}
              {noShowButton}
            </div>
        </div>
      </div>
    )
  }
}

export default PickupIndexTile
