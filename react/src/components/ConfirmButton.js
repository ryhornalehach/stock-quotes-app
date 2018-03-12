import React from 'react';

const ConfirmButton = props => {

  return (
    <div className="row">
      <button
          type="button"
          className="btn waves-effect waves-light green"
          onClick={props.handleButton}>
          {props.text}
      </button>
    </div>
  )
}

export default ConfirmButton
