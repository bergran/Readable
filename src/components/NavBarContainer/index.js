import React, { Component } from 'react'
import NavBarSection from '../NavBarSection'
import './styles.css'

class NavBarContainer extends Component {
    static defaultProps = {
        classNames: []
    }

    render () {
        const { sections, classNames } = this.props
        const classRaw = classNames.join(' ')
        return (
            <ul className={`nav-bar-container ${classRaw}`}>
                {
                    sections.map((section, index) => <li className='nav-bar-container-item' key={index}>
                        <NavBarSection {...section} />
                    </li>)
                }
            </ul>
        )
    }
}

export default NavBarContainer