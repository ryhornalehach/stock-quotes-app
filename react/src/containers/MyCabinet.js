import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PortfolioTile from '../components/PortfolioTile'
import AddSymbolForm from '../components/AddSymbolForm'
import ForexPortfolioTile from '../components/ForexPortfolioTile'
import AddForexForm from '../components/AddForexForm'

class MyCabinet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: null,  // portfolio will be stored here
      forexPortfolio: null,
      currentUserPortfolio: null, // this is needed to display the empty portfolio message to the user
      currentForexPortfolio: null,
      newSymbol: '', // will use this when adding the new stock to portfolio
      toCurrency: '',
      fromCurrency: ''
    }
    this.handleTextField = this.handleTextField.bind(this)  //binding the functions
    this.handleAddNewSymbol = this.handleAddNewSymbol.bind(this)
    this.handleDeleteSymbol = this.handleDeleteSymbol.bind(this)
    this.handleDeleteForex = this.handleDeleteForex.bind(this)
    this.handleAddNewForex = this.handleAddNewForex.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/stock/',{  // making fetch call to my API to read user's portfolio
      credentials: "same-origin"  // need this to transmit user's authentication details
    })
    .then(response => response.json())  // converting the response to JSON
    .then(body => {
        this.setState({ portfolio: body.portfolio, currentUserPortfolio: body.current_user_portfolio }) // writing portfolio to the state
    })

    fetch('/api/v1/forex/',{  // making fetch call to my API to read user's portfolio
      credentials: "same-origin"  // need this to transmit user's authentication details
    })
    .then(response => response.json())  // converting the response to JSON
    .then(body => {
        this.setState({ forexPortfolio: body.forex_portfolio, currentForexPortfolio: body.current_forex_portfolio }) // writing portfolio to the state
    })
  }

  // handleNewSymbolField(event) {    // function to handle the text field.
  //     this.setState({ newSymbol: event.target.value })  // setting the state with the value of the text field
  // }

  handleTextField(event) {    // function to handle the text fields.
    let value = event.target.value;   // current value of the field
    let name = event.target.name;     // name of the corresponding text field
    this.setState({ [name]: value })  // setting the state with the value of the corresponding field
  }

  handleAddNewSymbol(event) {     // function to handle the submit of the form
      event.preventDefault();     // preventing the default action - page reload
      let newSymbol = this.state.newSymbol  // reading the new stock symbol from the input field
      this.setState({ newSymbol: '' })  // clearing the input field
      fetch("/api/v1/stock/1/", {   // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ add: newSymbol }) // sending the request body
    })
      location.reload();  // reload the page after the request was made
  }

  handleDeleteSymbol(event) {   // function to handle the delete stock button
      event.preventDefault();   // preventing the default action - page reload
      fetch("/api/v1/stock/1/", { // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ delete: event.target.name }) // sending the request body
    })
    location.reload();  // reload the page after the request was made
  }

  handleDeleteForex(event) {   // function to handle the delete stock button
      event.preventDefault();   // preventing the default action - page reload
      fetch("/api/v1/forex/1/", { // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ delete: event.target.name }) // sending the request body
    })
    location.reload();  // reload the page after the request was made
  }

  handleAddNewForex(event) {     // function to handle the submit of the form
      event.preventDefault();     // preventing the default action - page reload
      let newPair = `${this.state.fromCurrency}:${this.state.toCurrency}`  // reading the new stock symbol from the input field
      this.setState({ fromCurrency: '', toCurrency: '' })  // clearing the input field
      fetch("/api/v1/forex/1/", {   // making the update call to internal API
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ add: newPair }) // sending the request body
    })
      location.reload();  // reload the page after the request was made
  }

  render() {
    let portfolio, addSymbolForm, forex_portfolio, addForexForm; // will use this variables to render React components
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
        portfolio = <p><i className="fa fa-cog fa-lg fa-spin" aria-hidden="true"></i> Loading your stock portfolio, please wait a second...</p>;
    }

    addSymbolForm = <AddSymbolForm  // form to add new stock to portfolio
                        newSymbol={this.state.newSymbol}  // sending info to component as props
                        handleTextField={this.handleTextField}  // sending handler function to component as props
                        handleAddNewSymbol={this.handleAddNewSymbol}      // sending handler function to component as props
                    />

                    //////    ForEx block   ////
    if (this.state.forexPortfolio && this.state.forexPortfolio.length != 0) { // checking that portfolio exists and its not empty
        forex_portfolio = this.state.forexPortfolio.map((position, index) => {    // iterating through the portfolio array and rendering React component for each element
            return (
                <ForexPortfolioTile  // this tile that will be displayed for each item of portfolio
                    key={index}            // sending info to component as props
                    fromCurrency={position['from_currency']}      // sending info to component as props
                    toCurrency={position['to_currency']} // sending info to component as props
                    rate={position['rate']}                   // sending info to component as props
                    handleDeleteForex={this.handleDeleteForex}  // sending handler function to component as props
                />
            )
        })
    } else if (this.state.currentForexPortfolio == 'empty') {  // if user's portfolio is empty - display the corresponding message
        forex_portfolio = 'Your ForEx portfolio is currently empty. Please add positions to your portfolio';
    } else {  // displaying 'loading' message to the user while API call is being made
        forex_portfolio = <p><i className="fa fa-cog fa-lg fa-spin" aria-hidden="true"></i> Loading your ForEx portfolio, please wait a second...</p>;
    }

    addForexForm = <AddForexForm  // form to add new stock to portfolio
                        fromCurrency={this.state.fromCurrency}  // sending info to component as props
                        toCurrency={this.state.toCurrency}
                        handleTextField={this.handleTextField}  // sending handler function to component as props
                        handleAddNewForex={this.handleAddNewForex}      // sending handler function to component as props
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

          <div className="row">
              <div className="col s12">
                  <h4>My ForEx</h4>
                  <p>*Latest exchange rates showed</p>
              </div>
          </div>
          {addForexForm}
          <div className="row">
              <div className="col s12">
                  <ul>{forex_portfolio}</ul>
              </div>
          </div>
      </div>
    )
  }
}

export default MyCabinet
