import React, { Component } from 'react';
import './App.css';
import * as API from '../../utils/api'

class App extends Component {
  componentDidMount() {
    API.getCategories()
      .then(categories => {
        API.getPost(categories[0].name)
          .then(data => console.log(data))
      })
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
