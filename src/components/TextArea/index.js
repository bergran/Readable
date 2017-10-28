import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
* @param isRequired (bool): flag to know if input is required or not, is part of validation
* @param validations (array): function of validation, these functions will receive value and have to return a boolean
*
* */


class TextArea extends Component {

    static propTypes = {
        initialValue: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        isRequired: PropTypes.bool,
        validations: PropTypes.array
    }

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

    componentDidMount () {
        const { initialValue, name, onChange } = this.props
        onChange({
            name: name,
            value: initialValue,
            isValid: this.isValid(initialValue)
        })
    }

    handleChange = e => {
        const { name, onChange } = this.props
        e.preventDefault()
        const value = e.target.value

        onChange({
            isValid: this.isValid(value),
            value: e.target.value,
            name
        })
        this.setState({
            value: value
        })
    }

    isValid = (value) => {
        const { isRequired, validations } = this.props
        const resultValidation = this.handleValidation(value)
        return ((isRequired && resultValidation.length === validations.length) || (isRequired && value.length > 0) ||
            !isRequired
        )
    }

    handleValidation = value => {
        const { validations } = this.props
        return validations.filter(validation => validation(value)).length === validations.length
    }

    render () {
        const { label, placeholder } = this.props
        const { value } = this.props
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