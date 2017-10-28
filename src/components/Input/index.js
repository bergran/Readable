import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

/**
*
* Component that manage input control, when component did mount will call to onChange callback with the initial value
* this is done to notice parent that initial value and is valid that value
*
* @param initialValue(string): it's the initial value, this value is using on component did mount to notice parent
* component
* @param value(string): it's the value that will render on input value. Input not manage value, it manage events that
* change it
* @param isRequired(string): it's a flag which the value will be calculate into onChange event
* @param label(string): Input label
* @param placeholder(string): Input placeholder
* @param onchange(func): callback function that is called when onChange input activate
* @param validations(array): function array, these functions can receive value and check if value is valid
* @param type(string): Input type
*
* */

class Input extends Component {

    static propTypes = {
        initialValue: PropTypes.string,
        value: PropTypes.string.isRequired,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        validations: PropTypes.array,
        type: PropTypes.string
    }

  static defaultProps = {
    value: '',
    isRequired: false,
    name: 'defaultName',
    label: 'defaultLabel',
    type: 'text',
    placeholder: '',
    initialValue: '',
    onChange: () => ({}),
    validations: [],
  }

  componentDidMount () {
      const { initialValue, name, onChange } = this.props
      onChange({
          name: name,
          value: initialValue,
          isValid: this.isValid(initialValue)
      })
  }

  handleChange = (event) => {
    event.preventDefault()
    const { name, onChange } = this.props;
    onChange({
        name,
        value: event.target.value,
        isValid: this.isValid(event.target.value),
    })
  }

  handleValidation = value => {
      const { validations } = this.props
      return validations.filter(validation => validation(value)).length
  }

  isValid = (value) => {
      const { isRequired, validations } = this.props
      const resultValidation = this.handleValidation(value)
      return ((isRequired && resultValidation.length === validations.length) || (isRequired && value.length > 0) ||
          !isRequired
      )
  }

  render () {
    const { label, type, name, placeholder, value } = this.props
    return (
      <section className='input-container-out'>
        <label className='input-container-label'>
          { label }
        </label>
        <section className='input-container-int'>
          <input
            type={type}
            value={value}
            name={name}
            onChange={this.handleChange}
            placeholder={placeholder}
            className='input'
          />
        </section>
      </section>)
  }
}

export default Input
