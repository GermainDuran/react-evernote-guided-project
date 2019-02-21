import React from 'react';

// using slice para truncar el parrafo en la vista
const NoteList = (props) => (

  <li onClick={(event) => props.handleClick(event, props)}>
    <h2>{props.title}</h2>
    <p1>{props.body.slice(0,30)}...</p1>
  </li>


);

export default NoteList;
