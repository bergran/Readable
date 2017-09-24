import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../actions/user'
import Input from '../Input'

class UserLog extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { isValid, value } = this.state
    if (isValid) {
      this.props.addUser(value)
    } else {
      // TODO (ABG) Add an alert
    }
  }

  handleSkip = () => {
    const num = Math.ceil(Math.random() * 100)
    const name = `anon_${num}`
    this.props.addUser(name)
  }

  handleChange = (inputRaw) => {
    const input = inputRaw['name']
    this.setState((prevState) =>
      ({
        value: input.value,
        isValid: input.isValid
      })
  )
  }

  render () {
    const { value } = this.state
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <Input
            label='¿Cual es tu nombre?'
            type='text'
            name='name'
            value={value}
            onChange={this.handleChange}
          />
          <button role='submit'>Send</button>
          <button role='button' onClick={this.handleSkip}>Skip</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addUser: (data) => dispatch(addUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLog)
