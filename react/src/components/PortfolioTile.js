import React from 'react';

const PortfolioTile = props => {

  let currentStockColor, arrow; // will use this variables to display corresponding arrow for growth and decrease and to assign corresponding color - green or red
  if (props.growth == '+') {
    currentStockColor = 'green-text';
    arrow = '⇧';
  } else if (props.growth == '-') {
    currentStockColor = 'red-text';
    arrow = '⇩';
  }

  return (

    <div>
        <li className={currentStockColor}>{props.stockName}: ${props.lastCloseValue} {arrow} <button className="red-button" name={props.stockName} onClick={props.handleDeleteSymbol} >Delete</button></li>
    </div>
  )
}

export default PortfolioTile
