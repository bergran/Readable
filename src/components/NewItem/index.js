import React, { Component } from 'react'
import TextArea from '../TextArea'
import './styles.css'
import classNames from 'classnames';
import Input from "../Input/index";

export default class NewItem extends Component {

    static defaultProps = {
        classes: [],
        initialAuthor: '',
        initialItem: '',
        initialTitle: '',
        edit: false
    }

    constructor (props) {
        super(props)
        this.state = {
            [props.item]: {},
            'title': {},
            'author': {}
        }
    }

    handleSubmit = e => {
        const { onSubmit, item } = this.props

        e.preventDefault()
        this.props.onSubmit()
        this.handleChange({name: item, value: '', isValid: false})
        this.handleChange({name: 'author', value: '', isValid: false})
        if (item === 'post') this.handleChange({name: 'title', value: '', isValid: false})
    }

    handleChange = inputRaw => {
        this.props.onChange(inputRaw)
        this.setState({
            [inputRaw.name]: {
                value: inputRaw.value,
                isValid: inputRaw.isValid
            }
        })
    }

    render () {
        const {
            classes,
            label,
            isValid,
            item,
            initialAuthor,
            initialItem,
            initialTitle,
            edit
        } = this.props
        const {
            title,
            author
        } = this.state
        const classRaw = classes.join(' ')
        return (
            <form
                className={`newitem-form-container ${classRaw}`}
                onSubmit={this.handleSubmit}
            >
                {
                    !edit && <Input
                        label='Author'
                        name='author'
                        placeholder='Author post'
                        onChange={this.handleChange}
                        isRequired
                        initialValue={initialAuthor}
                        value={author.value}
                    />
                }
                {
                    item === 'post' &&
                        <Input
                            label='Title'
                            name='title'
                            placeholder='Title post'
                            onChange={this.handleChange}
                            isRequired
                            initialValue={initialTitle}
                            value={title.value}
                        />
                }
                <TextArea
                    onChange={this.handleChange}
                    name={item}
                    label={label}
                    isRequired
                    initialValue={initialItem}
                    placeholder={`Write here your ${item.toLowerCase()}`}
                    value={this.state[item].value}
                />
                <button
                    className={classNames({
                        'create-post-page-form-button': true,
                        'create-post-page-form-button-disabled': !isValid
                    })}
                    disabled={!isValid}
                >
                    {`${edit ? 'Edit' : 'Add'} ${item}`}
                </button>
            </form>
        )
    }
}