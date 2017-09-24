import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {

  static defaultProps = {
    value: '',
    name: 'defaultName',
    label: 'defaultLabel',
    type: 'text',
    placeholder: '',
    onChange: () => ({})
  }

  handleChange = (event) => {
    // TODO (ABG) execute validators
    const { name, onChange } = this.props
    const value = event.target.value
    onChange({
      [name]: {
        value,
        // Hack (ABG) this is hardcoded because a future TODO refactor
        isValid: true
      }
    })
  }

  render () {
    const { label, type, name, value, placeholder } = this.props
    return (
      <section>
        <label>
          { label }
        </label>
        <section>
          <input
            type={type}
            value={value}
            name={name}
            onChange={this.handleChange}
            placeholder={placeholder}
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
