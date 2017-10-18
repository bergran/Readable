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

    handleSubmit = e => {
        e.preventDefault()
        this.props.onSubmit()
    }

    render () {
        const {
            classes,
            label,
            isValid,
            item,
            onChange,
            initialAuthor,
            initialItem,
            initialTitle,
            edit
        } = this.props
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
                        onChange={onChange}
                        isRequired
                        validations={[(value => value.length > 0)]}
                        initialValue={initialAuthor}
                    />
                }
                {
                    item === 'post' &&
                        <Input
                            label='Title'
                            name='title'
                            placeholder='Title post'
                            onChange={onChange}
                            isRequired
                            initialValue={initialTitle}
                            validations={[(value => value.length > 0)]}
                        />
                }
                <TextArea
                    onChange={onChange}
                    name={item}
                    label={label}
                    isRequired
                    initialValue={initialItem}
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
                    {`${edit ? 'Edit' : 'Add'} ${item}`}
                </button>
            </form>
        )
    }
}