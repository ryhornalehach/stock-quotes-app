import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PortfolioTile from '../components/PortfolioTile'
import AddSymbolForm from '../components/AddSymbolForm'

class MyCabinet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: null,
      currentUserPortfolio: null,
      newSymbol: ''
    }
    this.handleNewSymbolField = this.handleNewSymbolField.bind(this)  //binding the functions
    this.handleAddNewSymbol = this.handleAddNewSymbol.bind(this)
    this.handleDeleteSymbol = this.handleDeleteSymbol.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/stock/',{
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(body => {
        this.setState({ portfolio: body.portfolio, currentUserPortfolio: body.current_user_portfolio })
    })
  }

  handleNewSymbolField(event) {    // function to handle the text field.
      this.setState({ newSymbol: event.target.value })  // setting the state with the value of the text field
  }

  handleAddNewSymbol(event) {     // function to handle the submit of the form
      event.preventDefault();   // preventing the default action - page reload
      let newSymbol = this.state.newSymbol
      this.setState({ newSymbol: '' })  // clearing the text field
      fetch("/api/v1/portfolio/1/", {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ add: this.state.newSymbol })
    })
      location.reload();
  }

  handleDeleteSymbol(event) {
      event.preventDefault();
      fetch("/api/v1/portfolio/1/", {
      method: 'PATCH',
      credentials: "same-origin",
      body: JSON.stringify({ delete: event.target.name })
    })
    location.reload();
  }

  render() {
    let portfolio, addSymbolForm;
    if (this.state.portfolio && this.state.portfolio.length != 0) {
        portfolio = this.state.portfolio.map((position) => {
            return (
                <PortfolioTile
                    key={position['stock_name']}
                    stockName={position['stock_name']}
                    lastCloseValue={position['last_close_value']}
                    growth={position['growth']}
                    handleDeleteSymbol={this.handleDeleteSymbol}
                />
            )
        })
    } else if (this.state.currentUserPortfolio == 'empty') {
        portfolio = 'Your portfolio is currently empty. Please add stock to your portfolio';
    } else {
        portfolio = <p><i className="fa fa-cog fa-lg fa-spin" aria-hidden="true"></i> Loading your portfolio, please wait a second...</p>;
    }

    addSymbolForm = <AddSymbolForm
                        newSymbol={this.state.newSymbol}
                        handleNewSymbolField={this.handleNewSymbolField}
                        handleAddNewSymbol={this.handleAddNewSymbol}
                    />

    return(
      <div>
          <div className="row">
              <div className="col s12">
                  <h4>My portfolio</h4>
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
