import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewItem from '../NewItem'
import uuid4 from 'uuid'
import { connect } from 'react-redux'
import { createComment } from "../../thunks/thunks";
import './styles.css'

/**
* container that renders a NewItem container. Create comment handle submit and change from NewItem.
*
* @prop postId(string): it's id post
* @prop addComment(func): dispatch addComment action
*
* @state author(object): it's author from input, contains isValid boolean var and value string var
* @state comment(object): it's comment from input, contains isValid boolean var and value string var
*
* */

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
            const { addComment, postId } = this.props
            const { author, comment } = this.state
            const uuid = uuid4()
            addComment({
                id: uuid,
                timestamp: Date.now(),
                body: comment.value,
                author: author.value,
                parentId: postId
            })
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

CreateComment.PropTypes = {
    postId: PropTypes.string.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    addComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)