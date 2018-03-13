import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const AddForexForm = props => {

    return(
      <div>
          <div className="row">
              <div className="col s12">
                  <p>Add new ForEx to your portfolio</p>
              </div>
          </div>
          <div className="row">
              <div className="col s6 m4 l2">
                  <label>Currency From:</label>
                  <input
                      name='fromCurrency'
                      onChange={props.handleTextField} // using the handler function for the text fields
                      type='text'
                      value={props.fromCurrency}   // getting the value from the state
                  />
              </div>
              <div className="col s6 m4 l2">
                  <label>Currency To:</label>
                  <input
                      name='toCurrency'
                      onChange={props.handleTextField} // using the handler function for the text fields
                      type='text'
                      value={props.toCurrency}   // getting the value from the state
                  />
              </div>


              <div className="col s6 m4 l2">
                  <input
                      type="submit"
                      onClick={props.handleAddNewForex}   // using the handler function for submit button
                      className="btn waves-effect waves-light navbar-color-dark"
                      value="Add"
                  />
              </div>
          </div>
      </div>
    )
  }

export default AddForexForm
