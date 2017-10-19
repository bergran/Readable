import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    getPost,
    fillCommentsPost,
    voteUpPostThunk,
    voteDownPostThunk,
    deletePostThunk
} from '../../thunks/thunks'
import { Link } from 'react-router-dom'
import ListItems from '../ListItems'
import VoteScore from '../VoteScore'
import { getUTCFormat } from "../../utils/tools";
import { LoadingItem } from '../LoadingItem'

class PostPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount () {
        const postId = this.props.match.params.post
        const { fillComments, addPost } = this.props
        Promise.all([
            addPost(postId),
            fillComments(postId)
        ])
        .then(data => {
            this.setState({
                isLoading: false
            })
        })
        .catch(data => {
            this.setState({
                isLoading: false
            })
        })

    }

    handlerVoteUp = () => {
        const { post, voteUp } = this.props
        voteUp(post.id)
    }

    handlerVoteDown = () => {
        const { post, voteDown } = this.props
        voteDown(post.id)
    }

    handleCreateComment = () => {
        const { history, match } = this.props
        history.push(`/posts/${match.params.post}/add`)
    }

    handleEdit = () => {
        const { history, match } = this.props
        history.push(`/posts/${match.params.post}/edit`)
    }

    handleDelete = () => {
        const { post, deletePost, history } = this.props
        deletePost(post.id)
            .then(data => {
                history.push('/')
            })
    }

    render () {
        const { post } = this.props
        const { isLoading } = this.state

        if (isLoading) {
            return (
                <LoadingItem />
            )
        }
        if (Object.keys(post).length === 0 || post.deleted) {
            return (
                <section className={'post-page-container'}>
                    <p className={'post-page-container-text'}>
                        Sorry, we could not get this post. Maybe this post was deleted or doesnt exist :'(
                    </p>
                    <p className={'post-page-container-text'}>
                        Go to <Link to={'/'}>Home</Link>
                    </p>
                </section>
            )
        } else {
            const { comments } = this.props

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
                                <p><strong>Date:</strong> {getUTCFormat(post.timestamp)}</p>
                            </article>
                            <article className={'post-page-header-article'}>
                                <p><strong>Category:</strong> <Link to={`/categories/${post.category}`}>{post.category}</Link></p>
                            </article>
                            <VoteScore
                                score={post.voteScore}
                                onUpScore={this.handlerVoteUp}
                                onDownScore={this.handlerVoteDown}
                            />
                            <button
                                onClick={this.handleDelete}
                            >
                                Delete post
                            </button>
                        </section>
                    </section>
                    <section className={'post-page-body'}>
                        <section className={'post-page-body-container'}>
                            <p className={'post-page-body-text'}>
                                {post.body}
                            </p>
                        </section>
                    </section>
                    <section
                        className='post-page-button-container'
                    >
                        <button
                            className='post-page-button'
                            onClick={this.handleEdit}
                        >
                            Edit post
                        </button>
                        <button
                            className='post-page-button'
                            onClick={this.handleCreateComment}
                        >
                            Add new Comment
                        </button>
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
    const comments = state.comments
        .filter(comment => comment.parentId === postId)
        .map(comment => {
            comment['history'] = ownProps.history
            return comment
        })

    return {
        post: post.length > 0 ? post[0] : {},
        comments: comments
    }
}

const mapDispatchToProps = dispatch => ({
    addPost: post => dispatch(getPost(post)),
    fillComments: post => dispatch(fillCommentsPost(post)),
    voteUp: post => dispatch(voteUpPostThunk(post)),
    voteDown: post => dispatch(voteDownPostThunk(post)),
    deletePost: postId => dispatch(deletePostThunk(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)