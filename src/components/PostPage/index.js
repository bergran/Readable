import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostPage extends Component {
    render () {
        return (
            <section>
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

export default connect(mapStateToProps)(PostPage)