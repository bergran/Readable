import './index.css'
import React, { Component } from 'react'
import NavBarSection from '../NavBarSection'
import PropTypes from 'prop-types'

/**
 * Component that renders a dynamic nav, this is a green line on web top page where will include a title and all
 * childrens
 *
 * @param title (string): contains a title navbar or app name
 * @param children (array): contains children nav-bar that will draw it into right nav side
 **/

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

Nav.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object
}

export default Nav