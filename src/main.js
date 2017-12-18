import './style/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

class Header extends React.Component {
  render(){
    return (
      <h1>Welcome to Notepad</h1>
    )
  }
}

class CreateNoteForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
                  value: ''
                };
  }

  updateState = (event) => {
    this.setState({value: event.target.value})
  }

  clearForm = (event) => {
    this.setState({value: ''
                  })
  }

  addNote = () => {
    let note =
      {
        id: uuid.v1(),
        editing: false,
        completed: false,
        content: this.state.value
      }
      this.props.postNote(note);
      this.clearForm();
    }

  render(){
    return (
      <div>
        <input type="text"
          name="note"
          value={this.state.value}
          onChange={this.updateState}>
        </input>
        <button onClick={this.addNote}>Add Note</button>
      </div>
    )
  }
}

class NoteItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}
  }

  openForm = (event) => {
    event.preventDefault()
    this.setState({showForm: true})
  }

  removeForm = (event) => {
    event.preventDefault()
    this.setState({showForm: false})
  }

  render(){
    return (
        <li id="note_{this.props.note.id}">
        <h3>Note: {this.props.note.id}</h3>
        <p>{this.props.note.content}</p>
        <button value={this.props.note.id} onClick={this.props.deleteNote}>Delete Note</button>
        <button  onClick={this.openForm}>Edit Note</button>
        <div id="form_{this.props.note.id}">
        {this.state.showForm === true &&
          <NoteUpdateForm note={this.props.note} noteUpdateField={this.props.noteUpdateField} removeForm={this.removeForm}/>
        }
        </div>
      </li>
    )
  }
}

class NoteUpdateForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {value: ''}
  }

  updateFormField = (event) => {
    this.setState({value: event.target.value})
  }

  updateNoteContent = (event) => {
    event.preventDefault()
    console.log(event.target.value);
    this.props.noteUpdateField(event.target.value, this.state.value)
  }

  render(){
    return (
      <form>
        <input value={this.state.value} onChange={this.updateFormField}/>
        <button value={this.props.note.id} onClick={this.updateNoteContent}>Update</button>
        <button onClick={this.props.removeForm}>Cancel Update</button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
                  list: []
                };
  }

postNote = (note) => {
  this.setState(state => {
    return {list: this.state.list.concat(note)};
  })
}

  deleteNote = (event) => {
    let newList = this.state.list.filter(note => note.id !== event.target.value)
    this.setState(state => {
      return {list: newList};
    })
  }

  noteUpdateField = (noteid, updatedContent) => {
    let index = this.state.list.findIndex(note => {
      return note.id === noteid
    })
    console.log(index);
    if(index > -1){
      this.setState(state => {
        this.state.list[index].content = updatedContent
        return {list: this.state.list}
      })
    }
  }

  render(){
    return (
      <div>
        <Header />
        <CreateNoteForm postNote={this.postNote}/>
        <ul>
          {this.state.list.map((note) =>
            <NoteItem note={note} deleteNote={this.deleteNote} noteUpdateField={this.noteUpdateField} upd/>
        )}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
