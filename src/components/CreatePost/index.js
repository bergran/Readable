import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'

class CreatePost extends Component {

    constructor (props) {
        super(props)
        this.state = {
            textArea: {
                isValid: false
            }
        }
    }

    handleSubmit = () => {
        const { textArea } = this.state
        if (textArea.isValid) {
            // send new post
            console.log('im valid')
        } // else do nothing
    }

    handleChange = inputRaw => {
        this.setState({
            textArea: inputRaw
        })
    }

    render () {
        const { textArea } = this.state
        return (
            <section className='create-post-page-container'>
                <h1 className='newitem-form-container-title'>
                    Create new post
                </h1>
                <NewItem
                    label='Post'
                    item='post'
                    isValid={textArea.isValid}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </section>
        )
    }
}

export default CreatePost