import React, { Component } from 'react'
import NavBarSection from '../NavBarSection'
import './styles.css'
import justify from '../../assest/glyph/glyphicons-114-justify.png'
import PropTypes from 'prop-types'

/**
 * Component that renders a list of nav-bar section
 *
 * @param classNames (array): contains an array of classNames
 * @param sections (array): contains an objects array that contains information about section
 **/

class NavBarContainer extends Component {
    static defaultProps = {
        classNames: []
    }

    render () {
        const { sections, classNames } = this.props
        const classRaw = classNames.join(' ')
        return (
            <section className={`nav-bar-container`}>
                <button
                    className={'nav-bar-container-button'}
                    onTouchStart={() => {}}
                >
                    <span className={'nav-bar-container-icon'}>
                        <img
                            src={justify}
                            alt="justify"
                        />
                    </span>
                </button>
                <ul className={`nav-bar-container-list ${classRaw}`}>
                    {
                        sections.map((section, index) => <li className='nav-bar-container-item ' key={index}>
                            <NavBarSection classNames={['nav-bar-container-section']} {...section} />
                        </li>)
                    }
                </ul>
            </section>
        )
    }
}

NavBarContainer.propTypes = {
    sections: PropTypes.array.isRequired,
    classNames: PropTypes.array,
}

export default NavBarContainer