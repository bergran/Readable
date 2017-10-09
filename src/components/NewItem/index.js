import React, { Component } from 'react'
import TextArea from '../TextArea'

export default class NewItem extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: {}
        }
    }

    static defaultProps = {
        classNames: []
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit()
        return false
    }

    render () {
        const { classNames, label, isValid, item, onChange } = this.props
        const classRaw = classNames.join(' ')
        return (
            <form
                className={`${classRaw}`}
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