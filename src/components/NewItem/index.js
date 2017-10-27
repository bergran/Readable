import React, { Component } from 'react'
import TextArea from '../TextArea'
import './styles.css'
import classNames from 'classnames';
import Input from "../Input/index";

/**
* Component that render a form which can used to create and edit post and comments
*
* @prop classes(array): contains an array with extra classNames
* @prop label(string): it's the label for the specific item
* @prop isValid(bool): it's a flag to enable or disable submit button
* @prop item(string): it's a string to tell component that type will create and will be too the name of the input
* @prop initialAuthor(string): it's initial state for author input
* @prop initialItem(String): it's initial state for item input
* @prop initialTitle(string): it's initial state for title input (optional, comment dont need it)
* @prop edit(bool): it's a flag to tell component if will be an edit or create
* @prop onSubmit(func): callback function that will be called when submit button it's clicked
* @prop onChange(func): callback function that will be called when onChange of any input is active, will send an object
* with input name(string), isValid calculated on input(boolean) and input value (string)
*
* @state title (object)(optional): this field only comes when item is a post. Contains isValid boolean var and
* value string var
* @state author(object): Contains isValid boolean var and value string var
* @state post/comment(object): Contains isValid boolean var and value string var
*
 * */


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
        onSubmit()
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