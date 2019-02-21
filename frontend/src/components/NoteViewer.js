import React, { Fragment } from 'react';

const NoteViewer = (props) => {

  return (
    <Fragment>
      <h4>{props.noteDetail.title}</h4>
      <p4>{props.noteDetail.body}</p4>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={(event) => props.handleEdit(event,props)}>Edit</button>
    </Fragment>
  );
}

export default NoteViewer;
