import React, { Component } from 'react'
import './styles.css'

class Category extends Component {

    handleClick = () => {
        const { onClick, path } = this.props
        onClick(`categories/${path}`)
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

export default Category