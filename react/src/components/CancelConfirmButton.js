import React from 'react';

const CancelConfirmButton = props => {

  return (
    <div className="row">
      <button
          type="button"
          className="btn waves-effect waves-light red"
          onClick={props.handleButton}>
          {props.text}
      </button>
    </div>
  )
}

export default CancelConfirmButton
