import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewItem from '../NewItem'
import uuid4 from 'uuid'
import './styles.css'


/**
* Container that create a post from category. This handle submit and change NewItem
*
* @param category (string): category id
*
* @action addPost (func): callback that is called when submit is active
* @action closeUp (func): callback that is called when addPost promise resolve
*
* @state title(object): it's title from input, contains isValid boolean var and value string var
* @state author(object): it's author from input, contains isValid boolean var and value string var
* @state post(object): it's post from input, contains isValid boolean var and value string var
*
* */

class CreatePost extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            // send new post
            const { addPost, category, closePopup } = this.props
            const { title, author, post } = this.state
            const uuid = uuid4()
            addPost({
                id: uuid,
                title: title.value,
                timestamp: Date.now(),
                body: post.value,
                author: author.value,
                category: category
            }).then(post =>
                closePopup()
            )
        } // else do nothing
    }

    handleChange = inputRaw => {
        this.setState({
            [inputRaw.name]: {
                isValid: inputRaw.isValid,
                value: inputRaw.value
            }
        })
    }

    areValid = () => {
        const keys = Object.keys(this.state)
        const validKeys = keys.filter(key => this.state[key].isValid)
        return (keys.length !== 0 && keys.length === validKeys.length)
    }

    render () {
        return (
            <section className='create-post-page-container'>
                <h1 className='newitem-form-container-title'>
                    Create new post
                </h1>
                <NewItem
                    label='Post'
                    item='post'
                    isValid={this.areValid()}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </section>
        )
    }
}

CreatePost.propTypes = {
    category: PropTypes.string.isRequired
}

export default CreatePost