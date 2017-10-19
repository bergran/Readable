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
        const { id, history } = this.props
        history.push(`/comments/${id}/edit`)
    }

    handleDelete = () => {
        const { id, deleteComment } = this.props
        deleteComment(id)
    }

    render () {
        const { author, voteScore, body, timestamp } = this.props;
        return (
            <section className='comment-item comment-item-background-gradient'>
                <section className='comment-item-header'>
                    <section className='comment-item-header-subtitle'>
                        <article className='comment-item-header-subtitle-article'>
                            <p>author: { author }</p>
                        </article>
                        <article className='comment-item-header-subtitle-article'>
                            <p>date: { getUTCFormat(timestamp) }</p>
                        </article>
                    </section>
                </section>
                <section className='comment-item-body'>
                    <h1 className='comment-item-body-title'>Comment</h1>
                    <p>
                        { body }
                    </p>
                </section>
                <VoteScore
                    score={voteScore}
                    onUpScore={this.handleUpVote}
                    onDownScore={this.handleDownVote}
                />
                <button
                    className='comment-item-body'
                    onClick={this.handleEdit}
                >
                    Modify comment
                </button>
                <button
                    className='comment-item-body'
                    onClick={this.handleDelete}
                >
                    Delete comment
                </button>
            </section>
        )
    }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    voteUp: comment => dispatch(voteUpCommentThunk(comment)),
    voteDown: comment => dispatch(voteDownCommentThunk(comment)),
    deleteComment: commentId => dispatch(deleteCommentThunk(commentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)