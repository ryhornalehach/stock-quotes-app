import React from 'react';

const InfoText = props => {
  let textModule;

  if (props.tag) {
    textModule = <props.tag>{props.text}</props.tag>
  } else {
    textModule = props.text
  }

  return (
    <div>
      {textModule}
    </div>
  )
}

export default InfoText
