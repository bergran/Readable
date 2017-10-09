import React, { Component } from 'react'
import { SwitchItem } from '../SwitchItem'
import './styles.css'

class ListItems extends Component {

    static defaultProps = {
        title: ''
    }

    handleClick = to => this.props.push(to)

    render () {
        const { title, items, type } = this.props
        return (
            <section className='list-item'>
                <h1 className='title'>
                    { title }
                </h1>
                <section className='list'>
                    {
                        items.length > 0 ?
                            <ul className='list-item-ul'>
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

                </section>
            </section>
        )
    }
}

export default ListItems