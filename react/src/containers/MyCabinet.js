import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PortfolioTile from '../components/PortfolioTile'
import AddSymbolForm from '../components/AddSymbolForm'

class MyCabinet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: null,  // portfolio will be stored here
      currentUserPortfolio: null, // this is needed to display the empty portfolio message to the user
      newSymbol: '' // will use this when adding the new stock to portfolio
    }
    this.handleNewSymbolField = this.handleNewSymbolField.bind(this)  //binding the functions
    this.handleAddNewSymbol = this.handleAddNewSymbol.bind(this)
    this.handleDeleteSymbol = this.handleDeleteSymbol.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/stock/',{  // making fetch call to my API to read user's portfolio
      credentials: "same-origin"  // need this to transmit user's authentication details
    })
    .then(response => response.json())  // converting the response to JSON
    .then(body => {
        this.setState({ portfolio: body.portfolio, currentUserPortfolio: body.current_user_portfolio }) // writing portfolio to the state
    })
  }

  handleNewSymbolField(event) {    // function to handle the text field.
      this.setState({ newSymbol: event.target.value })  // setting the state with the value of the text field
  }

  handleAddNewSymbol(event) {     // function to handle the submit of the form
      event.preventDefault();     // preventing the default action - page reload
      let newSymbol = this.state.newSymbol  // reading the new stock symbol from the input field
      this.setState({ newSymbol: '' })  // clearing the input field
      fetch("/api/v1/portfolio/1/", {   // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ add: this.state.newSymbol }) // sending the request body
    })
      location.reload();  // reload the page after the request was made
  }

  handleDeleteSymbol(event) {   // function to handle the delete stock button
      event.preventDefault();   // preventing the default action - page reload
      fetch("/api/v1/portfolio/1/", { // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ delete: event.target.name }) // sending the request body
    })
    location.reload();  // reload the page after the request was made
  }

  render() {
    let portfolio, addSymbolForm; // will use this variables to render React components
    if (this.state.portfolio && this.state.portfolio.length != 0) { // checking that portfolio exists and its not empty
        portfolio = this.state.portfolio.map((position) => {    // iterating through the portfolio array and rendering React component for each element
            return (
                <PortfolioTile  // this tile that will be displayed for each item of portfolio
                    key={position['stock_name']}            // sending info to component as props
                    stockName={position['stock_name']}      // sending info to component as props
                    lastCloseValue={position['last_close_value']} // sending info to component as props
                    growth={position['growth']}                   // sending info to component as props
                    handleDeleteSymbol={this.handleDeleteSymbol}  // sending handler function to component as props
                />
            )
        })
    } else if (this.state.currentUserPortfolio == 'empty') {  // if user's portfolio is empty - display the corresponding message
        portfolio = 'Your portfolio is currently empty. Please add stock to your portfolio';
    } else {  // displaying 'loading' message to the user while API call is being made
        portfolio = <p><i className="fa fa-cog fa-lg fa-spin" aria-hidden="true"></i> Loading your portfolio, please wait a second...</p>;
    }

    addSymbolForm = <AddSymbolForm  // form to add new stock to portfolio
                        newSymbol={this.state.newSymbol}  // sending info to component as props
                        handleNewSymbolField={this.handleNewSymbolField}  // sending handler function to component as props
                        handleAddNewSymbol={this.handleAddNewSymbol}      // sending handler function to component as props
                    />

    return(
      <div>
          <div className="row">
              <div className="col s12">
                  <h4>My portfolio</h4>
                  <p>*Latest quotes and last month performance showed</p>
              </div>
          </div>
          {addSymbolForm}
          <div className="row">
              <div className="col s12">
                  <ul>{portfolio}</ul>
              </div>
          </div>
      </div>
    )
  }
}

export default MyCabinet
