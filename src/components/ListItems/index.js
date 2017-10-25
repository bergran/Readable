import React, { Component } from 'react'
import { SwitchItem } from '../SwitchItem'
import './styles.css'
import sortBy from 'sort-by'

class ListItems extends Component {

    static defaultProps = {
        title: '',
        sortAttrs: []
    }

    constructor (props) {
        super(props)
        this.state = {
            sortAttr: ''
        }
    }

    handleClick = to => this.props.push(to)

    handleSelect = event => {
        this.setState({
            sortAttr: event.target.value
        })
    }

    render () {
        const { title, items, type, sortAttrs } = this.props
        const { sortAttr } = this.state
        const orderItems = items.sort(sortBy(sortAttr))
        return (
            <section className='list-item'>
                <section className="list-item-header">
                    <h1 className='title'>
                        { title }
                    </h1>
                    {
                        sortAttrs.length > 0 &&
                        <select
                            onChange={this.handleSelect}
                            className={'list-item-select'}
                        >
                            {
                                sortAttrs.map(attr => <option key={attr.value} value={attr.value}>{attr.title}</option>)
                            }
                        </select>
                    }
                </section>
                <section className='list'>
                    {
                        orderItems.length > 0 ?
                            <ul className='list-item-ul'>
                                {
                                    orderItems.map(item =>
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