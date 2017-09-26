import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Category extends Component {

    handleClick = () => {
        const { onClick, path } = this.props
        onClick(`categories/${path}`)
    }

    render () {
        const { id, posts } = this.props
        return (
            <section className={'category'} onClick={this.handleClick}>
                    <h1>{ id }</h1>
                    <section>
                        Posts number: {posts}
                    </section>
            </section>
        )
    }
}

export default Category