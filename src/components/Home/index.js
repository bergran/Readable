import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserLog from '../UserLog'
import * as API from '../../utils/api'
import { fillCategoriesThunk, fillCategoriesPosts } from '../../thunks/Home'


class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.props.fillCategoriesPosts()
  }

  render() {
    const { user } = this.props
    const { loading } = this.state
    return (
      <section className='home'>
        {
          !user.name ? <
            UserLog /> :
            (user.name && !loading) ?
             <div>Loaded</div> :
              <div> Loading</div>
        }
      </section>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  fillCategoriesPosts: () => dispatch(fillCategoriesPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
