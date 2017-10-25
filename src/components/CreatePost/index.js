import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'
import uuid4 from 'uuid'

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

export default CreatePost