import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserLog from '../UserLog'
import { fillCategoriesThunk, fillCategoriesPosts } from '../../thunks/Home'
import { ListItems } from "../ListItems/index";


class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.props.fillCategoriesPosts()
        .then(data => {
          this.setState({loading: false})
        })
  }

  render() {
    const { user, categories, posts } = this.props
    const { loading } = this.state
    console.log(loading)
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
                  />
                  <ListItems
                      title='posts'
                      items={posts}
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
  const categories = Object.keys(categoriesRaw).map(key => {
    return {
      id: key,
      path: categoriesRaw[key].path,
      posts: categoriesRaw[key].posts
    }
  })
  return {
    categories: categories,
    user: state.user,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => ({
  fillCategoriesPosts: () => dispatch(fillCategoriesPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
