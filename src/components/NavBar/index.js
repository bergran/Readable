import React, { Component } from 'react'
import NavBarContainer from '../NavBarContainer'
import NavBarSection from '../NavBarSection'

class NavBar extends Component {
    render () {
        return (
            <section className='navbar'>
                <NavBarSection
                    path='/'
                    title='Home'
                />
            </section>
        )
    }
}

export default NavBar