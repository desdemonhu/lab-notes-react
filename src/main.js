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

///Clears form when note is added
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
  }
  render(){
    return (
        <li>
        <h3>Note: {this.props.note.id}</h3>
        <p>{this.props.note.content}</p>
        <button value={this.props.note.id} onClick={this.props.deleteNote}>Delete Note</button>
      </li>
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

  render(){
    return (
      <div>
        <Header />
        <CreateNoteForm postNote={this.postNote}/>
        <ul>
          {this.state.list.map((note) =>
            <NoteItem  note={note} deleteNote={this.deleteNote}/>
        )}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
