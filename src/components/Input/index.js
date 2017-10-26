import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class Input extends Component {

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

// TODO (ABG) include propTypes!!
// Input.propTypes = {
//
// }

export default Input
