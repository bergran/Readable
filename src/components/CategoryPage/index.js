import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { Capitalize } from '../../utils/tools'
import { updaterThunk ,fillPostsThunk } from "../../thunks/thunks";

class CategoryPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount () {
        const { match, fillPostByCategory, updateTime } = this.props
        const category = match.params.category
        fillPostByCategory(updateTime.posts, category)
            .then(data => {
                console.log('acago')
                this.setState({isLoading: false})
            })
    }

    render () {
        const { posts, history, match } = this.props
        const { isLoading } = this.state
        return (
            <section>
                <h1>{ Capitalize(match.params.category) }</h1>
                <section>
                    <button role='button' onClick={history.goBack}>Back</button>
                    {
                        !isLoading ?
                            <ListItems
                                type='post'
                                items={posts}
                                push={history.push}
                            />
                            :
                            <section>
                                Loading...
                            </section>

                    }
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { category, updateTime } = ownProps.match.params
    const posts = state.posts.filter(post => post.category === category && !post.deleted)
    return {
        posts: posts,
        updateTime: state.updateTime
    }
}

const mapDispatchToProps = dispatch => {
    const fillPost = updaterThunk(fillPostsThunk)
    return {
        fillPostByCategory: (time, category)=> dispatch(fillPost(time, category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)