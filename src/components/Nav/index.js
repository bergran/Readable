import React, { Component } from 'react'
import './index.css'
import NavBarSection from '../NavBarSection'

class Nav extends Component {
    render() {
        const { title, children } = this.props
        return (
            <nav className='app-nav app-nav-green'>
                <NavBarSection
                    title={title}
                    className={['navbar-right']}
                />
                <section
                    className='navbar-right'
                >
                    { children }
                </section>
            </nav>
        )
    }
}

export default Nav