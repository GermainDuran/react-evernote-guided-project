import React, { Component } from 'react';

class NoteEditor extends Component {

  state = {
    currentTitle: this.props.noteEdit.title,
    currentBody: this.props.noteEdit.body
  }

  updatePatch = (editID, editTitle, editBody) => {
   let editURL = `${'http://localhost:3000/api/v1/notes'}/${editID}`
   let editPatch = {
     method: 'PATCH',
     body: JSON.stringify({
       title: editTitle,
       body: editBody
     }),
     headers: {
       'Content-type': 'application/json',
       'Accept': 'application/json',
     }
   }
   return fetch(editURL, editPatch).then(resp=>resp.json())
 }


  handleSubmit = (event, props, state) => {
   event.preventDefault()
   let editID = props.noteEdit.unaNota.id
   let editTitle = state.currentTitle
   let editBody = state.currentBody
   // console.log(event, props.noteEdit.unaNota.id, state.currentTitle, state.currentBody);
   // tengo un fetchnotes porque quiero ver todo los cambios en el side bar sin refrescar
   this.updatePatch(editID, editTitle, editBody).then(()=> this.props.fetchNotes()).then(r => this.props.handleClick(event,r))

   // .then((data)=>{console.log(data,"joelyn")
  // this.props.handleClick(event,data)})

  // this.setState({
  //   props.noteDetail: props.noteEdit
  // })

   // // <h4>{props.noteDetail.title}</h4>
   // <p4>{props.noteDetail.body}</p4>
  //this.props.handleEdit(event,props)
  //this.props.handleCancel()
//  this.props.handleClick(event,props.noteEdit.unaNota)
 }

handleChange1 = (event) => {
  console.log("hey")
  this.setState({
    currentTitle: event.target.value
  })
}

handleChange2 = (event) => {
  console.log("hey")
  this.setState({
    currentBody: event.target.value
  })
}


  render() {
    console.log(this.state.currentTitle,"Actual title")
    console.log(this.state.currentBody,"Actual Body")
  // console.log("Props in NoteEditor",this.props)
    return (
      <form className="note-editor" >
        <input type="text" name="title"  value={this.state.currentTitle} onChange={this.handleChange1}  />
        <textarea name="body" value={this.state.currentBody} onChange={this.handleChange2}   />
        <div className="button-row">
          <input className="button" type="submit" value="Save" onClick={(event) => this.handleSubmit(event, this.props, this.state)}/>
          <button type="button"onClick={this.props.handleCancel}>Cancel</button>
          <button onClick={(event)=> this.props.handleDelete(event,this.props.noteEdit.unaNota.id)}>Delete</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
