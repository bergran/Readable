import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Home from '../Home'
import CategoryPage from "../CategoryPage";

class App extends Component {
  render() {
    return (
      <section className="App">
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            exact
            path='/categories/:category'
            component={CategoryPage}
          />
      </section>
    )
  }
}

export default App;
