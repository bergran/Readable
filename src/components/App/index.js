import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Home from '../Home'
import CategoryPage from "../CategoryPage";
import PostPage from "../PostPage";
import Nav from '../Nav'
import NavBarContainer from "../NavBarContainer/index";
import CreatePost from "../CreatePost/index";
import CreateComment from "../CreateComment/index";


class App extends Component {
  render() {
    return (
      <section className="App">
          <Nav
              title='Readable'
          >
              <NavBarContainer
                title={'menu'}
                sections={[
                    {title: 'Home', path: '/'},
                    {title: 'Create post', path: '/'},
                ]}
              />
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
              path='/categories/:category/add'
              component={CreatePost}
          />
          <Route
              exact
              path='/posts/:post'
              component={PostPage}
          />
          <Route
              exact
              path='/posts/:id/add'
              component={CreateComment}
          />
      </section>
    )
  }
}

export default App;
