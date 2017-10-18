import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewItem from '../NewItem'
import {LoadingItem} from "../LoadingItem/index";

class EditComment extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            inputs: {}
        }
    }

    componentDidMount () {
        this.setState({isLoading: false})
    }

    handleChange = inputRaw => {
        let { inputs } = this.state
        inputs[inputRaw.name] = {
            isValid: inputRaw.isValid,
            value: inputRaw.value
        }
        this.setState({inputs})
    }

    handleSubmit = () => {
        const formValid = this.areValid()
        if (formValid) {
            alert('hey!')
        }
    }

    areValid = () => {
        const { inputs } = this.state
        const keys = Object.keys(inputs)
        return keys.filter(key => inputs[key].isValid).length === keys.length
    }

    render () {
        const { comment } = this.props
        const { isLoading } = this.state
        if (isLoading) {
            return (
                <LoadingItem />
            )
        }
        return (
            <section className='editcomment-container'>
                <NewItem
                    label={'Comment'}
                    item={'comment'}
                    initialItem={comment.body}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    isValid={this.areValid()}
                    edit
                />
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { match } = ownProps
    const commentRaw = state.comments.filter(comment => comment.id === match.params.comment)
    return {
        comment: commentRaw.length === 1 ? commentRaw[0] : {}
    }
}

export default connect(mapStateToProps)(EditComment)