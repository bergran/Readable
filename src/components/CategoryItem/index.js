import React from 'react'
import { Link } from 'react-router-dom'

export const Category = props => {
    const { id, path, posts } = props
    console.log(props)
    return (
        <section className={'category'}>
            <Link
                to={ path }
            >
                <h1>{ id }</h1>
                <section>
                    Posts number: {posts.length}
                </section>
            </Link>
        </section>
    )
}