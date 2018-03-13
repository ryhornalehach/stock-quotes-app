import React from 'react';

const PortfolioTile = props => {

  let currentStockColor, arrow;
  if (props.growth == '+') {
    currentStockColor = 'green-text';
    arrow = '⇧';
  } else if (props.growth == '+') {
    currentStockColor = 'red-text';
    arrow = '⇩';
  }

  return (

    <div className="col s12 m4 l3">
        <p className={currentStockColor}>{props.stockName}: ${props.lastCloseValue} {arrow}</p>
    </div>
  )
}

export default PortfolioTile
