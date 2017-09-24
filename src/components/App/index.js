import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Home from '../Home'

class App extends Component {
  render() {
    return (
      <section className="App">
        <BrowserRouter basename='/'>
          <Route
            exact
            path='/'
            component={Home}
          />
        </BrowserRouter>
      </section>
    )
  }
}

export default App;
