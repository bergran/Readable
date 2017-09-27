import React, { Component } from 'react'
import Category from "../CategoryItem/index";
import PostItem from "../PostItem/index";

class ListItems extends Component {

    static defaultProps = {
        title: ''
    }

    handleClick = to => this.props.push(to)

    render () {
        const { title, items, type } = this.props
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
                                    { type === 'categories' ?
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