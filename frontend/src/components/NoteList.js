import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

  const notesArray = props.secondLevelNotesDAta.map((note) => {
    return <NoteItem handleClick={props.handleClick} unaNota={note} key={note.id} title={note.title} body={note.body} />
  })

  return (
    <ul>
      {notesArray}
    </ul>
  );
}

export default NoteList;
      // <NoteItem />
