import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    voteUpPostThunk,
    voteDownPostThunk,
    deletePostThunk
} from '../../thunks/thunks'
import './styles.css'
import VoteScore from '../VoteScore'

/**
*
* component that renders a little container with information post, linked with redux
*
* @param id(string): post id
* @param category(string): post category
* @param author(string): post author
* @param title(string): post title
* @param comments(int): post comments number
* @param onClick(func): callback function. its called when click into the title of post item
*
*
* @action deletePost(string): dispatch a deletePost action
* @action voteUp(func): dispatch a voteUp action
* @action voteDown(func): dispatch a voteDown action
*
* */

class PostItem extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        author: PropTypes.string,
        title: PropTypes.string,
        comments: PropTypes.number,
        onClick: PropTypes.func
    }

    static defaultProps = {
        author: '',
        title: '',
        comments: 0,
        onClick: () => ({})
    }

    handleClick = () => {
        const { onClick, id, category } = this.props
        onClick(`/${category}/${id}`)
    }

    handleDelete = () => {
        const { id, deletePost } = this.props
        deletePost(id)
    }

    handleUpScore = () => {
        const { voteUp, id } = this.props
        voteUp(id)
    }

    handleDownScore = () => {
        const { voteDown, id } = this.props
        voteDown(id)
    }

    render () {
        const {
            title,
            author,
            comments
        } = this.props
        return (
            <section className='post-item-container' >
                <h1
                    className={'post-item-title'}
                    onClick={this.handleClick}
                >
                    { title }
                </h1>
                <section
                    className={'post-item-container-attributes'}
                >
                    <section
                        className={'post-item-container-attribute'}
                    >
                        <p
                            className={'post-item-container-text'}
                        >author: { author }</p>
                    </section>
                    <section
                        className={'post-item-container-attribute'}
                    >
                        <p
                            className={'post-item-container-text'}
                        >comments: { comments }</p>
                    </section>
                    <section
                        className={'post-item-container-attribute'}
                    >
                        <VoteScore
                            onUpScore={this.handleUpScore}
                            onDownScore={this.handleDownScore}
                            score={this.props.voteScore}
                        />
                    </section>

                </section>
            </section>
        )
    }
}

const mapStateToProps =() => ({})
const mapDispatchToProps = dispatch => ({
    voteUp: post => dispatch(voteUpPostThunk(post)),
    voteDown: post => dispatch(voteDownPostThunk(post)),
    deletePost: postId => dispatch(deletePostThunk(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)