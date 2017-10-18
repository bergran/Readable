import React from 'react'
import ReactLoading from 'react-loading'


export const LoadingItem = props => {
    return (
        <section
            className='post-page-container-loading'
        >
            <ReactLoading
                type='cylon'
                color='#444'
            />
        </section>
    )
}