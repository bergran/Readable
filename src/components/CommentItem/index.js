import React, { Component } from 'react'
import VoteScore from '../VoteScore'
import './styles.css'
import { getUTCFormat } from "../../utils/tools";
import { connect } from 'react-redux'
import {
    voteUpCommentThunk,
    voteDownCommentThunk,
    deleteCommentThunk
} from '../../thunks/thunks'
import '../../assest/font-awesome/css/font-awesome.min.css'
import {updateChildren} from "../../actions/popup";
import Dialog from '../Dialog'
import EditComment from '../EditComment'


class CommentItem extends Component {

    handleUpVote = () => {
        const { id, voteUp } = this.props
        voteUp(id)
    }

    handleDownVote = () => {
        const { id, voteDown } = this.props
        voteDown(id)
    }

    handleEdit = () => {
        const { openPopup, id } = this.props
        const popup = (
            <Dialog>
                <EditComment comment={id} />
            </Dialog>
        )
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
    openPopup: dialog => dispatch(updateChildren(dialog))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)