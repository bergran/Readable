import React, { Component } from 'react'
import TextArea from '../TextArea'
import './styles.css'
import classNames from 'classnames';
import Input from "../Input/index";

export default class NewItem extends Component {

    static defaultProps = {
        classes: [],
        title: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit()
    }

    handleChange

    render () {
        const { classes, label, isValid, item, onChange, title } = this.props
        const classRaw = classes.join(' ')
        return (
            <form
                className={`newitem-form-container ${classRaw}`}
                onSubmit={this.handleSubmit}
            >
                <Input
                    label='Author'
                    name='author'
                    placeholder='Author post'
                    onChange={onChange}
                    validations={[(value => value.length > 0)]}
                />
                <TextArea
                    onChange={onChange}
                    name={item}
                    label={label}
                    placeholder={`Write here your ${item.toLowerCase()}`}
                />
                <button
                    className={classNames({
                        'create-post-page-form-button': true,
                        'create-post-page-form-button-disabled': !isValid
                    })}
                    disabled={!isValid}
                >
                    Add post
                </button>
            </form>
        )
    }
}