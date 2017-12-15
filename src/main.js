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
  constructor(content){
    super(content);
    this.state = {value: '',
                  list: []
                };
  }

  addNote = () => {
    let note =
      {
        id: uuid.v1(),
        editing: false,
        completed: false,
        content: this.state.value
      }
    this.setState(state => {
      return {list: this.state.list.concat(note)};
    });
    this.setState(state => {
      return {value: ''};
    });
  }

  updateState = (event) => {
    this.setState({value: event.target.value})
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
        <input type="text"
          name="note"
          value={this.state.value}
          onChange={this.updateState}>
        </input>
        <button onClick={this.addNote}>Add Note</button>
        <ul>
          {this.state.list.map(note =>
            (
              <li>
              <h3>Note: {note.id}</h3>
              <p>{note.content}</p>
              <button value={note.id} onClick={this.deleteNote}>Delete Note</button>
            </li>
          )
        )}
        </ul>
      </div>
    )
  }
}


class App extends React.Component {
  render(){
    return (
      <div>
        <Header />
        <CreateNoteForm />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
