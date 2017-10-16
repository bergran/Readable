import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'

class CreatePost extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            // send new post
            console.log('im valid')
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

    handleMount = initalInputs => {
        this.setState({...initalInputs})
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
                    onMount={this.handleMount}
                />
            </section>
        )
    }
}

export default CreatePost