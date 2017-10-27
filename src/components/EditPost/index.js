import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'

/**
*
* Component that get post and render form with post data to edit it.
*
* @prop post(object): contains a post object (id, title, author, body, etc...)
* @prop editPost(func): dispatch a edit post action
* @prop closePopup(func): dispatch a close popup action
*
* @state title(object): contains value string var and isValid boolean var
* @state post(object): contains value string var and isValid boolean var
*
* */


class EditPost extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    handleChange = inputRaw => {
        const inputs = this.state
        inputs[inputRaw.name] = {
            isValid: inputRaw.isValid,
            value: inputRaw.value
        }
        this.setState(inputs)
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            const { post, editPost, closePopup } = this.props
            const inputs =  this.state
            editPost(post.id, inputs.title.value, inputs.post.value)
                .then(data => {
                    closePopup()
                })
        }
    }

    areValid = () => {
        const inputs = this.state
        const keys = Object.keys(inputs)
        return keys.filter(key => inputs[key].isValid).length === keys.length
    }

    render () {
        const { post } = this.props

        return (
            <section className='editpost-container'>
                <h1 className='newitem-form-container-title'>
                    Edit post
                </h1>
                <NewItem
                    initialAuthor={post.author}
                    initialTitle={post.title}
                    initialItem={post.body}
                    item='post'
                    label='Post'
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    isValid={this.areValid()}
                    edit
                />
            </section>
        )
    }
}

export default EditPost