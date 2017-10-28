import './styles.css'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * This component renders a nav-bar section, this is a single element of nav. His function could be design with a
 * title, redirect to another web or go back.
 *
 * @param classNames (array): classNames that can be got the component
 * @param goBack (boolean): it's a flag to calculate if the section will redirect, will go back page
 * @param title (string): it's the name of the section
 *
 */

class NavBarSection extends Component {

    static defaultProps = {
        classNames: [],
        goBack: false
    }

    shouldComponentUpdate () {
        return false
    }

    handleClick = () => {
        const { history, path, goBack } = this.props;
        (path && !goBack)&& history.push(path)
        goBack && history.goBack()
    }

    render () {
        const { title, classNames } = this.props;
        const styles = classNames.join(' ')
        return (
            <section
                className={`nav-bar-section nav-bar-text-white ${styles}`}
                onClick={this.handleClick}
            >
                <section className="nav-bar-header">
                    <h1 className='nav-bar-title'>{ title }</h1>
                </section>
            </section>
        )
    }
}

NavBarSection.propTypes = {
    classNames: PropTypes.array,
    path: PropTypes.string,
    goBack: PropTypes.bool,
    history: PropTypes.object.isRequired
}

export default withRouter(NavBarSection)