import React, { Component } from 'react'
import './styles.css'
import { connect } from 'react-redux'

/**
* This component is a container that size is all screen and will display children into the center of the screen, this
* component is linked with redux
*
* @prop popup(node): contains a dialog, and only can be displayed with updateChildren and deleteChildren
* */

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
