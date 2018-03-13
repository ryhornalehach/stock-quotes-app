import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PortfolioTile from '../components/PortfolioTile'

class MyCabinet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: null,
      currentUserPortfolio: null
    }
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

  render() {
    let portfolio;
    if (this.state.portfolio) {
      portfolio = this.state.portfolio.map((position) => {
        return (
          <PortfolioTile
              key={position['stock_name']}
              stockName={position['stock_name']}
              lastCloseValue={position['last_close_value']}
              growth={position['growth']}
          />
        )
      })
    } else {
      portfolio = 'Please add stock to your portfolio';
    }

    return(
      <div>
        <h4>My portfolio</h4>
        {portfolio}
        {this.state.currentUserPortfolio}
      </div>
    )
  }
}

export default MyCabinet
