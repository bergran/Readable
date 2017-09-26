import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserLog from '../UserLog'
import { fillCategoriesThunk, fillCategoriesPosts } from '../../thunks/Home'
import ListItems from "../ListItems/index";


class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.props.fillCategoriesPosts()
        .then(() => {
          this.setState({loading: false})
        })
  }

  shouldComponentUpdate(nextProps, nextState) {
      // only re-render if username exist and API is loaded
      return (nextProps.user.name.length > 0 && !nextState.loading)
  }

  render() {
    const { user, categories, posts, history } = this.props
    const { loading } = this.state
    return (
      <section className='home'>
        {
          !user.name ?
            <UserLog /> :
            (user.name && !loading) ?
                <section>
                  <ListItems
                      title='categories'
                      items={categories}
                      push={history.push}
                  />
                  <ListItems
                      title='posts'
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

const mapStateToProps = state => {
  const categoriesRaw = state.categories
  const categories = Object.keys(categoriesRaw).filter(key => !categoriesRaw[key].deleted).map(key => ({
      id: key,
      path: categoriesRaw[key].path,
      posts: categoriesRaw[key].posts
  }))
  const posts = state.posts.filter(post => !post.deleted).map(post => ({
      id: post.id,
      title: post.title,
      timestamp: post.timestamp,
      votes: post.voteScore,
      author: post.author,
      comments: post.comments
    }))
  return {
    categories: categories,
    user: state.user,
    posts: posts
  }
}

const mapDispatchToProps = (dispatch) => ({
  fillCategoriesPosts: () => dispatch(fillCategoriesPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
