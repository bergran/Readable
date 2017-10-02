import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles.css'

class NavBarSection extends Component {

    shouldComponentUpdate () {
        return false
    }

    handleClick = () => {
        const { history, path } = this.props
        path && history.push(path)
    }

    render () {
        const { title } = this.props
        return (
            <section className='nav-bar-section' onClick={this.handleClick}>
                <h1 className='nav-bar-title'>{ title }</h1>
            </section>
        )
    }
}

export default withRouter(NavBarSection)