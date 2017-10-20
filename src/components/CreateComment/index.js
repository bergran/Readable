import React, { Component } from 'react'
import './styles.css'
import NewItem from '../NewItem'
import uuid4 from 'uuid'
import { connect } from 'react-redux'
import { createComment } from "../../thunks/thunks";

class CreateComment extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    handleChange = inputRaw => {
        this.setState({
            [inputRaw.name]: {
                isValid: inputRaw.isValid,
                value: inputRaw.value
            }
        })
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            // send new post
            const { addComment, match, history } = this.props
            const { author, comment } = this.state
            const uuid = uuid4()
            const postId = match.params.post
            addComment({
                id: uuid,
                timestamp: Date.now(),
                body: comment.value,
                author: author.value,
                parentId: postId
            }).then(post =>
                history.push(`/posts/${postId}`)
            )
        } // else do nothing
    }

    areValid = () => {
        const keys = Object.keys(this.state)
        const areValid = keys.filter(key => this.state[key].isValid)
        return keys.length === areValid.length
    }

    render () {
        return (
            <section className='create-comment-page-container'>
                <h1 className='newitem-form-container-title'>
                    Create new comment
                </h1>
                <NewItem
                    isValid={this.areValid()}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    item='comment'
                    label='Comment'
                />
            </section>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    addComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)