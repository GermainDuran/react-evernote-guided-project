import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  //
  // state = {
  //   notesData: [],
  //   selectedNoteId: null
  // }

  state = {
    notesData: [],
    noteDetail: null,
    noteEdit: null,
    notesToFilter: [],
    cancelButton: false,
    searchTerm: '',
    noteClicked: false,

  }

//fetchig mi data desde mi backend! con esto basicamente me traigo ladata y la guardo en mi array
//  componentDidMount() {
//    fetch('http://localhost:3000/api/v1/notes')
//    .then(resp => resp.json())
//    .then(data => this.setState({
//      notesData: data
//    })).then(() => console.log(this.state,"Venezuela"))
// }



fetchNotesAPI = () => {
  return fetch('http://localhost:3000/api/v1/notes').then(resp => resp.json()).then(data => this.setState({
    notesData: data,
    notesToFilter: data
  })).then(() => console.log(this.state))
}

 componentDidMount() {
  this.fetchNotesAPI()
}

// con este evento es para cuando la nota is clicked aparezca en el container del centro lo guardo
// en mi vector de detalles y uso setState para que re-render
    handleClick = (event, obj) => {
      console.log(obj,"Venezuela2")
      this.setState({
        noteDetail: obj,
        cancelButton: false,
        noteClicked: true,
        //noteDetail: this.state.notesData.find(note => this.state.noteDetail.id === note.id )
        // aqui puedo utilizar tambien mi boton de cancelar porque si le cambio el valor ya no va a ir content
      })
    }

    // handleClick = (event, obj) => {
    //
    //   this.setState({
    //     noteDetail: obj.id,
    //   })
    // }

    handleEdit = (event,obj) => {
        console.log("Hola Arturo, this is the obj to edit:", obj)
        this.setState({
          noteEdit: obj.noteDetail,
          cancelButton: true,
      //    noteDetail: this.state.notesData.find(note => this.state.noteDetail.id === note.id )
        })
    }

    handleCancel = () => {
      this.setState({
        cancelButton: false,
        noteClicked: true,
      //  noteDetail: this.state.notesData.find(note => this.state.noteDetail.id === note.id )
      })
    }




    // findNote = () => {
    //   return this.state.notesData.find(note => {
    //     return note.id === this.state.selectedNoteId
    //   })
    // }

    handleNewNote = () => {
       console.log("posted note");
       let postTitle = 'default'
       let postBody = 'placeholder'
       this.postNote(postTitle, postBody).then(()=>this.fetchNotesAPI())
     }

        postNote = (newTitle, newBody) => {
         let postURL = 'http://localhost:3000/api/v1/notes'
         let postNew = {
           method: 'POST',
           body: JSON.stringify({
             title: newTitle,
             body: newBody
           }),
           headers: {
             'Content-type': 'application/json',
             'Accept': 'application/json'
           }
         }
          return fetch(postURL, postNew).then(resp=>resp.json())
        }


////////////////////////// este codigo es para el filtro Search
    handleSearch = (event) => {
      this.setState({
        searchTerm: event.target.value
      }, () => this.filterSearch() )

    }

     filterSearch = () => {
       let findNote = this.state.notesData.filter((note) => (
         note.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || note.body.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
      )
       this.setState({
        notesToFilter: findNote
      })
     }


     sortName = () => {
        //spread operator
        let nameArray = [...this.state.notesData]
        //console.log(weightArray)
        nameArray.sort(function(a, b) {
          if( a.title.toUpperCase() < b.title.toUpperCase()){
            return -1
          } else {
            return 1
          }
        })
        // aqui va a render one more time y luego va organizar todos los animales en el dom porque se ejecuta tdo de nuevo con esta criteria
        this.setState({notesToFilter : nameArray})
        //console.log(weightArray)
        console.log(nameArray)
      }

      handleDelete = (event,objID) => {
        event.preventDefault()
          this.deleteRequest(objID).then(()=>this.fetchNotesAPI())

          console.log("trying to delete")
          this.setState({
            noteDetail: null,
            cancelButton: false,
          })
        }

         deleteRequest = (deleteID) => {
          let deleteURL = `${'http://localhost:3000/api/v1/notes'}/${deleteID}`
          let deleteMethod = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
              }
          }
          return fetch(deleteURL, deleteMethod).then(resp=>resp.json())
        }

        // sortDate = () => {
        //    //spread operator
        //    let nameArray2 = [...this.state.notesData]
        //    //console.log(weightArray)
        //    nameArray2.sort(function(a, b) {
        //      a = new Date(a.dateModified);
        //      b = new Date(b.dateModified);
        //      return a<b ? -1 : a>b ? 1 : 0;
        //
        //      // if( a.title.toUpperCase() < b.title.toUpperCase()){
        //      //   return -1
        //      // } else {
        //      //   return 1
        //      // }
        //    })
        //    // aqui va a render one more time y luego va organizar todos los animales en el dom porque se ejecuta tdo de nuevo con esta criteria
        //    this.setState({notesToFilter : nameArray2})
        //    //console.log(weightArray)
        //    console.log(nameArray2)
        //  }


  render() {
    return (
      <Fragment>
        <Search search={this.handleSearch}/>
        <div className='container'>
          <Sidebar notesData={this.state.notesToFilter} handleClick={this.handleClick} handleNewNote={this.handleNewNote} sortName={this.sortName}  />
          <Content noteDetail={this.state.noteDetail} cancelState={this.state.cancelButton} handleCancel={this.handleCancel}
                   handleEdit={this.handleEdit} noteEdit={this.state.noteEdit} fetchNotes={this.fetchNotesAPI} showState={this.state.noteClicked} handleDelete={this.handleDelete} handleClick={this.handleClick}/>
        </div>
      </Fragment>
    );
  }
}





export default NoteContainer;
