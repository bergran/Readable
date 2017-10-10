import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class Input extends Component {

  static defaultProps = {
    value: '',
    name: 'defaultName',
    label: 'defaultLabel',
    type: 'text',
    placeholder: '',
    initialValue: '',
    onChange: () => ({})
  }

  constructor (props) {
    super(props)
    this.state = {
      input: {
        isValid: false,
        value: props.initialValue
      }
    }
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
    this.setState({
        input: {
          isValid: true,
          value: event.target.value
        }
    })
  }

  render () {
    const { label, type, name, placeholder } = this.props
    const { input } = this.state
    return (
      <section className='input-container-out'>
        <label className='input-container-label'>
          { label }
        </label>
        <section className='input-container-int'>
          <input
            type={type}
            value={input.value}
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
