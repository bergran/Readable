import React, { Component } from 'react'

class Category extends Component {

    handleClick = () => {
        const { onClick, path } = this.props
        onClick(`categories/${path}`)
    }

    render () {
        const { id } = this.props
        return (
            <section className={'category'} onClick={this.handleClick}>
                    <h1>{ id }</h1>
            </section>
        )
    }
}

export default Category