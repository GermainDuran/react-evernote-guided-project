import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';


class Content extends Component {
  renderContent = () => {
    if (this.props.showState && this.props.cancelState) {
      console.log('arturo Edit',this.props.handleEdit);
      return <NoteEditor  noteEdit={this.props.noteEdit} handleEdit={this.props.handleEdit} handleCancel={this.props.handleCancel} fetchNotes={this.props.fetchNotes} showState={this.props.showState} handleDelete={this.props.handleDelete} handleClick={this.props.handleClick} />;
    } else if (this.props.noteDetail) {
      return <NoteViewer handleEdit={this.props.handleEdit} noteDetail={this.props.noteDetail}  />;
    } else {
      return <Instructions />;
    }
  }


  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
