import React, { Component } from 'react'
import './styles.css'
import { connect } from 'react-redux'

class Popup extends Component {
    render () {
        const { popup } = this.props
        return (
            popup &&
            <section className="popup">
                { popup }
            </section>
        )
    }
}

const mapStateToProps = state => ({
    popup: state.popup
})

export default connect(mapStateToProps)(Popup)
