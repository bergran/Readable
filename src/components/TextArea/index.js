import React, { Component } from 'react'
import './styles.css'

/**
* Component that render a text area component html. This render's a label, and text area.
* This component manage value of textarea on state attribute.
*
* @param initialValue (string): this will be the initial value of the text area
* @param name (string): will be the name that the input will recognize
* @param onChange (func): callback that will be called when textarea change
* @param placeholder (string): text that will show it into text area as placeholder
* @param label (string): text that will be the label and showed to the user
* */


class TextArea extends Component {

    static defaultProps = {
        initialValue: '',
        validations: [],
        isRequired: false,
        placeholder: '',
        name: 'defaultName',
        label: 'defaultLabel',
        onChange: () => ({})
    }

    constructor (props) {
        super(props)
        this.state = {
            value: props.initialValue
        }
    }

    handleChange = e => {
        const { name, onChange, validations, isRequired } = this.props
        e.preventDefault()
        let isValid;
        const value = e.target.value

        if (validations.length > 0) {
            const resultValidations = this.handleValidations(value)
            isValid = resultValidations ||
                (isRequired && resultValidations) ||
                !isRequired
        } else {
            isValid = true
        }

        onChange({
            isValid: isValid,
            value: e.target.value,
            name
        })
        this.setState({
            value: value
        })
    }

    handleValidations = value => {
        const { validations } = this.props
        return validations.filter(validation => validation(value)).length === validations.length
    }


    render () {
        const { label, placeholder } = this.props
        const { value } = this.state
        return (
            <section className='textarea'>
                <label className='textarea-label'>{label}</label>
                <section className='textarea-container'>
                    <textarea
                          placeholder={placeholder}
                          onChange={this.handleChange}
                          className='textarea-container-input'
                          value={ value }
                    >
                    </textarea>
                </section>
            </section>
        )
    }
}

export default TextArea