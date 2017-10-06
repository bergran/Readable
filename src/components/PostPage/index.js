import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fillPostsThunk, fillCommentsPost, voteUpPostThunk, voteDownPostThunk } from '../../thunks/thunks'
import { Link } from 'react-router-dom'
import ListItems from '../ListItems'
import VoteScore from '../VoteScore'

class PostPage extends Component {

    componentDidMount () {
        const postId = this.props.match.params.post
        const { fillComments, fillPost } = this.props
        Promise.all([
            fillComments(postId),
            fillPost(postId)
        ])

    }

    handlerVoteUp = () => {
        const { post, voteUp } = this.props
        voteUp(post.id)
    }

    handlerVoteDown = () => {
        const { post, voteDown } = this.props
        voteDown(post.id)
    }

    render () {
        const { post } = this.props
        if (post.deleted) {
            return (
                <section>
                    Sorry, this post is deleted :'(
                </section>
            )
        } else {
            const { comments } = this.props
            const date = new Date(post.timestamp)
            const day = date.getDay().toString().padStart(2, '0')
            const month = date.getMonth().toString().padStart(2, '0')
            return (
                <section className={'post-page-container'}>
                    <section className={'post-page-header'}>
                        <h1 className={'post-page-header-title'}>
                            { `${post.title} ` }
                            <span className={'post-page-header-span-subtitle'}>
                                { post.author }
                            </span>
                        </h1>
                        <section className={'post-page-header-subtitle'}>
                            <article className={'post-page-header-article'}>
                                <p><bold>Date:</bold> {`${month}/${day}/${date.getFullYear()}`}</p>
                            </article>
                            <article className={'post-page-header-article'}>
                                <p><bold>Category:</bold> <Link to={`/categories/${post.category}`}>{post.category}</Link></p>
                            </article>
                            <VoteScore
                                score={post.voteScore}
                                onUpScore={this.handlerVoteUp}
                                onDownScore={this.handlerVoteDown}
                            />
                        </section>
                    </section>
                    <section className={'post-page-body'}>
                        {post.body}
                    </section>
                    <ListItems
                        type='comments'
                        items={comments}
                    />
                </section>
            )
        }
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
    fillComments: post => dispatch(fillCommentsPost(post)),
    voteUp: post => dispatch(voteUpPostThunk(post)),
    voteDown: post => dispatch(voteDownPostThunk(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)