import React, { Component } from 'react'
import './index.css'

class Nav extends Component {
    render() {
        return (
            <section className='app-nav'>
                {this.props.children}
            </section>
        )
    }
}

export default Nav