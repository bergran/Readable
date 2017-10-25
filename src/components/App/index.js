import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Home from '../Home'
import CategoryPage from "../CategoryPage";
import PostPage from "../PostPage";
import Nav from '../Nav'
import NavBarContainer from "../NavBarContainer";
import CreatePost from "../CreatePost";
import CreateComment from "../CreateComment";
import EditPost from '../EditPost'
import EditComment from '../EditComment'
import Popup from '../Popup'


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
                ]}
              />
          </Nav>
          <Popup />
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            exact
            path='/:category'
            component={CategoryPage}
          />
          <Route
              exact
              path='/:category/:post'
              component={PostPage}
          />
          <Route
              exact
              path='/comments/:comment/edit'
              component={EditComment}
          />
      </section>
    )
  }
}

export default App;
