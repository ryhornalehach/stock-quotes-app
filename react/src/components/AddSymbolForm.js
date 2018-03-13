import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize'

const AddSymbolForm = props => {

    return(
      <div>
          <div className="row">
              <div className="col s12">
                  <p>Add new stock to your portfolio</p>
              </div>
          </div>
          <div className="row">
              <div className="col s12 m6 l4">
                  <label>New stock symbol:</label>
                  <input
                      name='newSymbol'
                      onChange={props.handleTextField} // using the handler function for the text fields
                      type='text'
                      value={props.newSymbol}   // getting the value from the state
                  />
              </div>

              <div className="col s12 m6 l4">
                  <input
                      type="submit"
                      onClick={props.handleAddNewSymbol}   // using the handler function for submit button
                      className="btn waves-effect waves-light navbar-color-dark"
                      value="Add"
                  />
              </div>
          </div>
      </div>
    )
  }

export default AddSymbolForm
