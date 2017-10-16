import React, { Component } from 'react'
import './styles.css'
import NewItem from '../NewItem'


class CreateComment extends Component {

    handleChange = inputRaw => {
        console.log(inputRaw)
    }

    handleSubmit = () => {
        console.log('Submit')
    }

    handleMount = (inputs) => {
        console.log(inputs)
    }

    render () {
        return (
            <section className='create-comment-page-container'>
                <NewItem
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    onMount={this.handleMount}
                    item='comment'
                    label='Comment'
                />
            </section>
        )
    }
}

export default CreateComment