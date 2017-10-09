import React, { Component } from 'react'
import NewItem from '../NewItem'

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
        console.log('qwerqre')
        debugger
        const { textArea } = this.props
        if (textArea.isValid) {
            // send new post
            console.log('im valid')
        } // else do nothing
    }

    handleChange = inputRaw => {
        console.log('entro', inputRaw)
        this.setState({
            textArea: inputRaw
        })
    }

    render () {
        const { textArea } = this.state
        return (
            <section className='create-post-page-container'>
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