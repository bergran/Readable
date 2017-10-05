import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fillPostsThunk, fillCommentsPost } from '../../thunks/thunks'
import { Link } from 'react-router-dom'

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
        const { post } = this.props
        if (post.deleted) {
            return (
                <section>
                    Sorry, this post is deleted :'(
                </section>
            )
        } else {
            const { comment } = this.props
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
                                <p><bold>Date:</bold> {post.timestamp}</p>
                            </article>
                            <article className={'post-page-header-article'}>
                                <p><bold>Category:</bold> <Link to={`/categories/${post.category}`}>{post.category}</Link></p>
                            </article>
                            <article className={'post-page-header-article'}>
                                <p><bold>Vote:</bold> { post.voteScore }</p>
                            </article>
                        </section>
                    </section>
                    <section className={'post-page-body'}>
                        {post.body}
                    </section>
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
    fillComments: post => dispatch(fillCommentsPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)