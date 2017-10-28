import React, { Component } from 'react'
import VoteScore from '../VoteScore'
import './styles.css'
import { getUTCFormat } from "../../utils/tools";
import { connect } from 'react-redux'
import {
    voteUpCommentThunk,
    voteDownCommentThunk,
    deleteCommentThunk, editComment
} from '../../thunks/thunks'
import '../../assest/font-awesome/css/font-awesome.min.css'
import {deleteChildren, updateChildren} from "../../actions/popup";
import Dialog from '../Dialog'
import EditComment from '../EditComment'
import PropTypes from 'prop-types'


/**
* container that renders a comment item with a vote score system, delete system, openPopup and edit comment. This
* container has been linked to redux
*
* @stateRedux id(string): it's the comment id
* @stateRedux author(string): it's the author id
* @stateRedux parentId(string): it's post parent comment id
* @stateRedux deleted(bool): it's a flag that said if comment is deleted
* @stateRedux deleteParent(bool): it's a flag that said if parent comment is deleted
* @stateRedux body(string): it's body comment
* @stateRedux voteScore(int): it's comment score
*
* @action editComment(func): dispatch a editComment function
* @action voteDown(func): dispatch a voteDown function
* @action voteUp(func): dispatch a voteUp function
* @action deleteComment(func): dispatch a deleteComment function
* @action closePopup(func): close popup
* @action openPopup(func): activate/change popup

* */

class CommentItem extends Component {

    static defaultProps = {
        body: '',
        voteScore: 0,
        deleted: true,
        deleteParent: true,
        author: 'Anon'
    }

    handleUpVote = () => {
        const { id, voteUp } = this.props
        voteUp(id)
    }

    handleDownVote = () => {
        const { id, voteDown } = this.props
        voteDown(id)
    }

    handleEdit = () => {
        const {
            openPopup,
            editComment,
            closePopup,
            id,
            author,
            parentId,
            deleted,
            deleteParent,
            timestamp,
            body
        } = this.props
        const popup = (
            <Dialog>
                <EditComment
                    comment={{
                        id,
                        author,
                        parentId,
                        deleted,
                        deleteParent,
                        timestamp,
                        body,
                    }}
                    editComment={editComment}
                    closePopup={closePopup}
                />
            </Dialog>
        )
        openPopup(popup)
    }

    handleDelete = () => {
        const { id, deleteComment } = this.props
        deleteComment(id)
    }

    render () {
        const {
            author,
            voteScore,
            body,
            timestamp
        } = this.props;
        return (
            <section className='comment-item comment-item-background-gradient'>
                <section className='comment-item-header'>
                    <section className='comment-item-header-subtitle'>
                        <article className='comment-item-header-subtitle-article'>
                            <p>By: { author }</p>
                        </article>
                        <article className='comment-item-header-subtitle-article'>
                            <p>date: { getUTCFormat(timestamp) }</p>
                        </article>
                    </section>
                </section>
                <section className='comment-item-body'>
                    <h1 className='comment-item-body-title'>Comment</h1>
                    <section className="comment-item-body-text">
                        <p>
                            { body }
                        </p>
                    </section>
                </section>
                <VoteScore
                    score={voteScore}
                    onUpScore={this.handleUpVote}
                    onDownScore={this.handleDownVote}
                />
                <section className='comment-items-button-container'>
                    <button
                        className='comment-item-body-button comment-item-body-button-warning'
                        onClick={this.handleEdit}
                    >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                        Modify
                    </button>
                    <button
                        className='comment-item-body-button comment-item-body-button-danger'
                        onClick={this.handleDelete}
                    >
                        <i className="fa fa-remove" aria-hidden="true"></i>
                        Delete
                    </button>
                </section>
            </section>
        )
    }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    voteUp: comment => dispatch(voteUpCommentThunk(comment)),
    voteDown: comment => dispatch(voteDownCommentThunk(comment)),
    deleteComment: commentId => dispatch(deleteCommentThunk(commentId)),
    openPopup: dialog => dispatch(updateChildren(dialog)),
    closePopup: () => dispatch(deleteChildren()),
    editComment: (id, body) => dispatch(editComment(id, body))
})

CommentItem.propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string,
    parentId: PropTypes.string.isRequired,
    deleted: PropTypes.bool,
    deletedParent: PropTypes.bool,
    body: PropTypes.string,
    voteScore: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)