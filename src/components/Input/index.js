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
    validations: []
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.initialValue
    }
  }

  handleChange = (event) => {
    const { name, onChange, isRequired, validations } = this.props;
    let isValid;


    // If input has validations then will executed else just will put is valid
    if (validations.length > 0) {
        const resultValidation = this.handleValidation(event.target.value)
        isValid = resultValidation ||
            (isRequired && resultValidation) ||
            !isRequired
    } else {
        isValid = true
    }

    onChange({
        name,
        value: event.target.value,
        isValid: isValid,
    })
    this.setState({
      value: event.target.value
    })
  }

  handleValidation = value => {
      const { validations } = this.props
      return validations.filter(validation => validation(value)).length === validations.length
  }

  render () {
    const { label, type, name, placeholder } = this.props
    const { value } = this.state
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
