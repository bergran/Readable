import React from 'react'
import {Category} from "../CategoryItem/index";

export const ListItems = props => {
    const { title, items } = props
    return (
        <div className='list-item'>
            <h1 className='title'>
                { title }
            </h1>
            <div className='list'>
                <ul>
                    {
                        items.map(item =>
                            <li key={item.id}>
                                { title === 'categories' ? <Category {...item} /> : false }
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}