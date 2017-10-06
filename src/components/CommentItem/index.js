import React, { Component } from 'react'
import VoteScore from '../VoteScore'
import './styles.css'
import { getUTCFormat } from "../../utils/tools";

class CommentItem extends Component {

    render () {
        const { author, voteScore, body, timestamp } = this.props;
        return (
            <section className='comment-item comment-item-background-gradient' onClick={this.handleClick}>
                <section className='comment-item-header'>
                    <section className='comment-item-header-subtitle'>
                        <article className='comment-item-header-subtitle-article'>
                            <p>author: { author }</p>
                        </article>
                        <article className='comment-item-header-subtitle-article'>
                            <p>date: { getUTCFormat(timestamp) }</p>
                        </article>
                        <VoteScore
                            score={voteScore}
                            onUpScore={() => {}}
                            onDownScore={() => {}}
                        />

                    </section>
                </section>
                <section className='comment-item-body'>
                    <p>
                        { body }
                    </p>
                </section>
            </section>
        )
    }
}

export default CommentItem