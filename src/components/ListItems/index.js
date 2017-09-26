import React, { Component } from 'react'
import Category from "../CategoryItem/index";
import PostItem from "../PostItem/index";

class ListItems extends Component {

    handleClick = to => this.props.push(to)

    render () {
        const { title, items } = this.props
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
                                    { title === 'categories' ?
                                        <Category
                                            onClick={this.handleClick}
                                            {...item}
                                        /> :
                                        <PostItem
                                            onClick={this.handleClick}
                                            {...item}
                                        />
                                     }
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ListItems