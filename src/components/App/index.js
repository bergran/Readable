import React, { Component } from 'react';
import './App.css';
import * as API from '../../utils/api'

class App extends Component {
  componentDidMount() {
    API.getCategories()
        .then(data => console.log(data))
        .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        Hello world
      </div>
    );
  }
}

export default App;
