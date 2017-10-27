import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { fillCategoriesThunk, fillPostsThunk } from "../../thunks/thunks";
import { LoadingItem } from "../LoadingItem";
import './styles.css'


/**
*
* Component that renders to all categories and all post with sort option, is linked to redux
*
* @prop categories(array): contains a list of categories objects
* @prop posts(array): contains a list of post objects
* @prop fillCategoriesPost(func): dispatch fill categories action
* @prop fillPost(func): dispatch fill post action
*
* @state isLoading(bool): is a flag to render LoadingItem or categories and post list
*
* */

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount () {
    const { fillCategoriesPosts, fillPost } = this.props
    Promise.all([
        fillCategoriesPosts(),
        fillPost()
    ]).then(() => {
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
                      sortAttrs={[
                          {value: '-timestamp', title: 'newest'},
                          {value: 'timestamp', title: 'oldest'},
                          {value: '-voteScore', title: 'max-vote'},
                          {value: 'voteScore', title: 'min-vote'}
                      ]}
                  />
                </section>
            :
                  <LoadingItem />
        }
      </section>
    )
  }
}

const mapStateToProps = state => {
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
      category: post.category,
      comments: post.comments
    }))
  return {
    categories: categories,
    posts: posts,
  }
}

const mapDispatchToProps = dispatch => ({
    fillCategoriesPosts: () => dispatch(fillCategoriesThunk()),
    fillPost: categories => dispatch(fillPostsThunk(categories))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
