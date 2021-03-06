import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    getPost,
    fillCommentsPost,
    voteUpPostThunk,
    voteDownPostThunk,
    deletePostThunk,
    editPost
} from '../../thunks/thunks'
import { Link } from 'react-router-dom'
import ListItems from '../ListItems'
import VoteScore from '../VoteScore'
import { getUTCFormat, Capitalize } from "../../utils/tools";
import { LoadingItem } from '../LoadingItem'
import '../../assest/font-awesome/css/font-awesome.min.css'
import CreateComment from '../CreateComment'
import {deleteChildren, updateChildren} from "../../actions/popup";
import Dialog from '../Dialog'
import EditPost from '../EditPost'
import './styles.css'



/**
*
* Component that render a post page. this is a post information with edit, delete post and create comment to the same
* post, this component is linked to redux.
*
* @param post(object): contains information about post (id, category, comments, author, title etc...)
* @param comment(array): comment object list, contains the comment info about the post render
*
* @action addPost(func): dispatch addPost action
* @action openPopup(func): dispatch openPopup action
* @action editPost(func): dispatch editPost action
* @action deletePost(func): dispatch deletePost action
* @action voteUp(func): dispatch voteUp Post action
* @action voteDown(func): dispatch voteDown Post action
* @action closePopup(func): dispatch closePopup action
* @action fillComments(func): dispatch fillComments action
*
* */

class PostPage extends Component {

    static propTypes = {
        post: PropTypes.shape({
            category: PropTypes.string,
            deleted: PropTypes.bool,
            id: PropTypes.string,
            title: PropTypes.string,
            author: PropTypes.string,
            body: PropTypes.string,
            comments: PropTypes.number,
        }),
        comments: PropTypes.array
    }

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

    handleEdit = () => {
        const { post, openPopup, editPost, closePopup } = this.props
        const popup = (
            <Dialog>
                <EditPost closePopup={closePopup} editPost={editPost} post={post}/>
            </Dialog>
        )
        openPopup(popup)
    }

    handleDelete = () => {
        const { post, deletePost, history } = this.props
        deletePost(post.id)
            .then(data => {
                history.push('/')
            })
    }

    render () {
        const { post, match } = this.props
        const { isLoading } = this.state
        const category = match.params.category
        if (isLoading) {
            return (
                <LoadingItem />
            )
        }
        if (Object.keys(post).length === 0 || post.category !== category || post.deleted) {
            return (
                <section className={'post-page-container'}>
                    <p className={'post-page-container-text'}>
                        Sorry, we could not get this post. Maybe this post was deleted or
                        doesnt exist :'(
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
                                <p>
                                    <strong>Category: </strong>
                                    <Link to={`/${post.category}`}>{Capitalize(post.category)}</Link>
                                </p>
                            </article>
                            <VoteScore
                                score={post.voteScore}
                                onUpScore={this.handlerVoteUp}
                                onDownScore={this.handlerVoteDown}
                            />
                            <button
                                onClick={this.handleDelete}
                                className={'post-page-button-header post-page-button-danger'}
                            >
                                <i className='fa fa-remove' aria-hidden="true"></i>
                                <span> Delete </span>
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
                            <i className='fa fa-edit' aria-hidden="true"></i>
                            <span> Edit post</span>
                        </button>
                    </section>
                    <CreateComment
                        postId={post.id}
                    />
                    <ListItems
                        title={`Comments ${post.comments}`}
                        type='comments'
                        items={comments}
                        sortAttrs={[
                            {value: '-timestamp', title: 'newest'},
                            {value: 'timestamp', title: 'oldest'},
                            {value: '-voteScore', title: 'max-vote'},
                            {value: 'voteScore', title: 'min-vote'}
                        ]}
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
    deletePost: postId => dispatch(deletePostThunk(postId)),
    openPopup: dialog => dispatch(updateChildren(dialog)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    closePopup: () => dispatch(deleteChildren())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)