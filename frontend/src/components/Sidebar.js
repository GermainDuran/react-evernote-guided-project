import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <button onClick={this.props.sortName} >Sort Alphabetically</button>
        <NoteList handleClick={this.props.handleClick} secondLevelNotesDAta={this.props.notesData} />
        <button onClick={this.props.handleNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
