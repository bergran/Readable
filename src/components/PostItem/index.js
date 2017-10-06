import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    voteUpCommentThunk,
    voteDownCommentThunk
} from '../../thunks/thunks'

class PostItem extends Component {

    handleClick = () => {
        const { onClick, id } = this.props
        onClick(`/posts/${id}`)
    }

    render () {
        const { title, author, voteScore } = this.props
        return (
            <section className='post-item' >
                <h1 onClick={this.handleClick}>{ title }</h1>
                <section>
                    <p>author: { author }</p>
                    <p>votes: { voteScore }</p>
                </section>
            </section>
        )
    }
}

const mapStateToProps =() => {}
const mapDispatchToProps = dispatch => ({
    voteUp: comment => dispatch(voteUpCommentThunk(comment)),
    voteDown: comment => dispatch(voteDownCommentThunk(comment))
})

export default connect(mapStateToProps)(PostItem)