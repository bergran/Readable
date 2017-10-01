import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Home from '../Home'
import CategoryPage from "../CategoryPage";
import PostPage from "../PostPage";
import Nav from '../Nav'

class App extends Component {
  render() {
    return (
      <section className="App">
          <Nav>

          </Nav>
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
          <Route
              exact
              path='/posts/:post'
              component={PostPage}
          />
      </section>
    )
  }
}

export default App;
