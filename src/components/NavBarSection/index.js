import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.css'

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
        const { title, classNames } = this.props
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

export default withRouter(NavBarSection)