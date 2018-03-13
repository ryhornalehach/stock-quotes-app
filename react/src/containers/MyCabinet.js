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
    if (this.state.portfolio) {
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
        portfolio = 'Please add stock to your portfolio';
    } else {
        portfolio = 'Loading your portfolio, please wait a second...';
    }

    addSymbolForm = <AddSymbolForm
                        newSymbol={this.state.newSymbol}
                        handleNewSymbolField={this.handleNewSymbolField}
                        handleAddNewSymbol={this.handleAddNewSymbol}
                    />

    return(
      <div>
        <h4>My portfolio</h4>
        {addSymbolForm}
        {portfolio}
      </div>
    )
  }
}

export default MyCabinet
