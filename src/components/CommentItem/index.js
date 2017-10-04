import React, { Component } from 'react'

class CommentItem extends Component {

    render () {
        const { title, author, voteScore } = this.props;
        return (
            <section className='post-item' onClick={this.handleClick}>
                <h1>{ title }</h1>
                <section>
                    <p>author: { author }</p>
                    <p>votes: { voteScore }</p>
                </section>
            </section>
        )
    }
}

export default CommentItem