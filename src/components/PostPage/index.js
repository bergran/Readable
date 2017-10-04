import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fillPostsThunk, fillCommentsPost } from '../../thunks/thunks'

class PostPage extends Component {

    componentDidMount () {
        const postId = this.props.match.params.post
        const { fillComments, fillPost } = this.props
        Promise.all([
            fillComments(postId),
            fillPost(postId)
        ])

    }

    render () {
        const { post, comment } = this.props
        return (
            <section className={'post-page-container'}>
                Hello world
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.post
    const post = state.posts.filter(post => post.id === postId)
    const comments = state.comments.filter(comment => comment.parentId === postId)
    return {
        post: post.length > 0 ? post[0] : {},
        comments: comments
    }
}

const mapDispatchToProps = dispatch => ({
    fillPost: post => dispatch(fillPostsThunk(post)),
    fillComments: post => dispatch(fillCommentsPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)