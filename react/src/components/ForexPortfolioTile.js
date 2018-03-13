import React from 'react';

const ForexPortfolioTile = props => {
  return (
    <div>
        <li>{props.fromCurrency}-{props.toCurrency} : {props.rate} <button className="red-button" name={`${props.fromCurrency}:${props.toCurrency}`} onClick={props.handleDeleteForex} >Delete</button></li>
    </div>
  )
}

export default ForexPortfolioTile
