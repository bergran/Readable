import React, { Component } from 'react'
import TextArea from '../TextArea'
import './styles.css'

export default class NewItem extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: {}
        }
    }

    static defaultProps = {
        classNames: [],
        title: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit()
    }

    render () {
        const { classNames, label, isValid, item, onChange, title } = this.props
        const classRaw = classNames.join(' ')
        console.log(classNames)
        console.log(classRaw)
        return (
            <form
                className={`newitem-form-container ${classRaw}`}
                onSubmit={this.handleSubmit}
            >
                <TextArea
                    onChange={onChange}
                    name={item}
                    label={label}
                    placeholder={`Write here your ${item.toLowerCase()}`}
                />
                {
                    !isValid ?
                        <section
                            className='create-post-page-form-fake-button create-post-page-form-button-disabled'
                            disabled={!isValid}
                        >
                            Add Post
                        </section> :
                        <button
                            className='create-post-page-form-button'
                        >
                            Add Post
                        </button>
                }
            </form>
        )
    }
}