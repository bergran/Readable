import React, { Component } from 'react'
import NewItem from '../NewItem'
import './styles.css'


/**
*
* Component that get a comment object and render a form with the comment data to edit it.
*
* @prop comment(object): contains a comment object (id, parentId, delete, body...)
* @prop closePopup(func): dispatch close Popup action
* @prop editComment(func): dispatch edit comment action
*
* @state comment(object): contains value string var and isValid var
*
* */

class EditComment extends Component {

    constructor (props) {
        super(props)
        this.state = {}
    }

    handleChange = inputRaw => {
        let inputs = this.state
        inputs[inputRaw.name] = {
            isValid: inputRaw.isValid,
            value: inputRaw.value
        }
        this.setState(inputs)
    }

    handleSubmit = () => {
        const { closePopup } = this.props
        const formValid = this.areValid()
        if (formValid) {
            const { editComment, comment } = this.props
            const inputs = this.state
            editComment(comment.id, inputs.comment.value)
                .then(closePopup())
        }
    }

    areValid = () => {
        const inputs = this.state
        const keys = Object.keys(inputs)
        return keys.filter(key => inputs[key].isValid).length === keys.length
    }

    render () {
        const { comment } = this.props
        if (Object.keys(comment).length === 0 || comment.delete || comment.parentDelete) {
            return (
                <section className='editcomment-container'>
                    <p className='editcomment-container-text'>
                        Comment does not exist. This could be deleted or failed comment route
                    </p>
                </section>
            )
        }
        return (
            <section className='editcomment-container'>
                <h1 className='newitem-form-container-title'>
                    Edit comment
                </h1>
                <NewItem
                    label={'Comment'}
                    item={'comment'}
                    initialItem={comment.body}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    isValid={this.areValid()}
                    edit
                />
            </section>
        )
    }
}

export default EditComment