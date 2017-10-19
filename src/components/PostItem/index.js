import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    voteUpPostThunk,
    voteDownPostThunk,
    deletePostThunk
} from '../../thunks/thunks'

class PostItem extends Component {

    handleClick = () => {
        const { onClick, id } = this.props
        onClick(`/posts/${id}`)
    }

    handleDelete = () => {
        const { id, deletePost } = this.props
        deletePost(id)
    }

    render () {
        const { title, author, voteScore } = this.props
        return (
            <section className='post-item' >
                <h1 onClick={this.handleClick}>{ title }</h1>
                <section>
                    <p>author: { author }</p>
                    <p>votes: { voteScore }</p>
                    <button
                        onClick={this.handleDelete}
                        >
                        Delete post
                    </button>
                </section>
            </section>
        )
    }
}

const mapStateToProps =() => ({})
const mapDispatchToProps = dispatch => ({
    voteUp: post => dispatch(voteUpPostThunk(post)),
    voteDown: post => dispatch(voteDownPostThunk(post)),
    deletePost: postId => dispatch(deletePostThunk(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)