import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    voteUpPostThunk,
    voteDownPostThunk
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

const mapStateToProps =() => ({})
const mapDispatchToProps = dispatch => ({
    voteUp: post => dispatch(voteUpPostThunk(post)),
    voteDown: post => dispatch(voteDownPostThunk(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)