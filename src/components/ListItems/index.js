import React, { Component } from 'react'
import { SwitchItem } from '../SwitchItem'

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
                    {
                        items.length > 0 ?
                            <ul>
                                {
                                    items.map(item =>
                                        <li key={item.id}>
                                            {
                                                <SwitchItem
                                                    type={type}
                                                    onClick={this.handleClick}
                                                    {...item}
                                                />
                                            }
                                        </li>
                                    )
                                }
                            </ul> :
                            <section>
                                {`No ${type}`}
                            </section>
                    }

                </div>
            </div>
        )
    }
}

export default ListItems