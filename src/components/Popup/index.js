import React, { Component } from 'react'
import './styles.css'

class Popup extends Component {
    render () {
        const { children } = this.props
        return (
            <section className="popup">
                { children }
            </section>
        )
    }
}

export default Popup
