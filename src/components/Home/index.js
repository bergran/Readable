import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { updaterThunk, fillCategoriesThunk, fillPostsThunk } from "../../thunks/thunks";


class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    const { category, posts } = this.props.updateTime
    const { fillCategoriesPosts, fillPost } = this.props
      console.log('post', posts)
    Promise.all([
        fillCategoriesPosts(category),
        fillPost(posts)
    ])
        .then(() => {
            this.setState({isLoading: false})
          })
  }

  render() {
    const { categories, posts, history } = this.props
    const { isLoading } = this.state
    return (
      <section className='home'>
        {
            !isLoading ?
                <section>
                  <ListItems
                      title='categories'
                      type='categories'
                      items={categories}
                      push={history.push}
                  />
                  <ListItems
                      title='posts'
                      type='posts'
                      items={posts}
                      push={history.push}
                  />
                </section>
            :
              <div> Loading</div>
        }
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps)=> {
  const categoriesRaw = state.categories
  const categories = Object.keys(categoriesRaw).filter(key => !categoriesRaw[key].deleted).map(key => ({
      id: key,
      path: categoriesRaw[key].path,
  }))
  const posts = state.posts.filter(post => !post.deleted).map(post => ({
      id: post.id,
      title: post.title,
      timestamp: post.timestamp,
      voteScore: post.voteScore,
      author: post.author,
      comments: post.comments
    }))
  return {
    categories: categories,
    user: state.user,
    posts: posts,
    updateTime: state.updateTime
  }
}

const mapDispatchToProps = dispatch => {
    const fillCategory = updaterThunk(fillCategoriesThunk)
    const fillPosts = updaterThunk(fillPostsThunk)
    return {
        fillCategoriesPosts: time => dispatch(fillCategory(time)),
        fillPost: time => dispatch(fillPosts(time))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
