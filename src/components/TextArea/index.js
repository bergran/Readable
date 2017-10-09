import React, { Component } from 'react'


class TextArea extends Component {

    constructor (props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChange = e => {
        const { name, onChange } = this.props
        e.preventDefault()
        console.log('entro')
        this.setState({
            value: e.target.value
        })
        onChange({
            // Value hardcoded, this component will have a refactor
            isValid: true,
            value: e.target.value,
            name
        })
    }

    render () {
        const { label, placeholder } = this.props
        const { value } = this.state
        return (
            <section className='textarea-label'>
                <label>{label}</label>
                <section className='textarea-container'>
                    <textarea
                          placeholder={placeholder}
                          onChange={this.handleChange}
                    >
                        { value }
                    </textarea>
                </section>
            </section>
        )
    }
}

export default TextArea