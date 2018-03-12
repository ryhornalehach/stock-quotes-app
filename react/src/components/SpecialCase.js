import React from 'react';

const SpecialCase = props => {

  let handleAddressLink = (event) => {
      let currentTime = new Date().toLocaleString();  // getting the current time of the link press event
      // Update spreadsheet with 'navigating to' status for the client
      fetch(`/api/v1/pickups/1`, {
          method: 'PATCH',   // PATCH method for updating the entry
          credentials: "same-origin",
          body: JSON.stringify({ newStatus: `navigating to "${event.target.innerText}" "autodropped off"`, currentClientName: props.keyWord, currentTime: currentTime })
        })
        .then(response => response.json())
        .then(body =>{
          if (body.updated_cells === 1) { // if the cell was updated
            console.log('Line status was successfully updated')
          } else {
            console.log('Error in updating the line status')
            console.log(body)
          }
        })
  }

  return (
    <div>
      {props.navigate} <a href={`https://www.google.com/maps/place/${props.text}`} onClick={handleAddressLink}>{props.text}</a>
    </div>
  )
}

export default SpecialCase
