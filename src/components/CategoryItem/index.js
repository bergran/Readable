import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'


/**
 *  Component that renders category item. it has an onClick event that redirect to category page
 *
 *  @param id(string): contains category name
 *  @param path(string): contains category path
 *  @param onClick(func): contains a callback function that is called when click event section is activated
 **/

class Category extends Component {

    handleClick = () => {
        const { onClick, path } = this.props
        onClick(`${path}`)
    }

    render () {
        const { id } = this.props
        return (
            <section className={'categoryitem categoryitem-gray'} onClick={this.handleClick}>
                    <h1 className={'categoryitem-title'}>{ id }</h1>
            </section>
        )
    }
}

Category.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Category