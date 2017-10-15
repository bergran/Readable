import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'

class CreatePost extends Component {

    constructor (props) {
        super(props)
        this.state = {
            author: {
                isValid: false
            },
            post: {
                isValid: false
            }
        }
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            // send new post
            console.log('im valid')
        } // else do nothing
    }

    handleChange = inputRaw => {
        console.log(inputRaw)
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
                    isRequired
                />
            </section>
        )
    }
}

export default CreatePost