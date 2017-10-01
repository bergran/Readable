import React, { Component } from 'react'

class PostItem extends Component {

    handleClick = () => {
        const { onClick, id } = this.props
        onClick(`/posts/${id}`)
    }

    render () {
        const { title, author, voteScore, comments } = this.props
        return (
            <section className='post-item' onClick={this.handleClick}>
                <h1>{ title }</h1>
                <section>
                    <p>author: { author }</p>
                    <p>votes: { voteScore }</p>
                    <p>comments: { comments }</p>
                </section>
            </section>
        )
    }
}

export default PostItem