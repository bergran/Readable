import React, { Component } from 'react'
import TextArea from '../TextArea'
import './styles.css'
import classNames from 'classnames';
import Input from "../Input/index";

export default class NewItem extends Component {

    static defaultProps = {
        classes: [],
        onMount: () => ({})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit()
    }

    componentDidMount () {
        const { item, onMount } = this.props
        onMount({
            'author': {
                isValid: false
            },
            'title': {
                isValid: false
            },
            [item]: {
                isValid: false
            }
        })
    }

    render () {
        const { classes, label, isValid, item, onChange } = this.props
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
                    isRequired
                    validations={[(value => value.length > 0)]}
                />
                {
                    item === 'post' &&
                        <Input
                            label='Title'
                            name='title'
                            placeholder='Title post'
                            onChange={onChange}
                            isRequired
                            validations={[(value => value.length > 0)]}
                        />
                }
                <TextArea
                    onChange={onChange}
                    name={item}
                    label={label}
                    isRequired
                    placeholder={`Write here your ${item.toLowerCase()}`}
                    validations={[(value => value.length > 0)]}
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