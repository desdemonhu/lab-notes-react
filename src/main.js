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

    this.addNote = this.addNote.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  addNote(){
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
  }

  updateState(event){
    this.setState({value: event.target.value})
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
          {this.state.list.map((note) =>
            (
              <li>
              <h3>Note: {note.id}</h3>
              <p>{note.content}</p>
              <button>Delete Note</button>
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
