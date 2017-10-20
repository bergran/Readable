import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewItem from '../NewItem'
import {LoadingItem} from "../LoadingItem/index";
import { getComment, editComment } from '../../thunks/thunks'
import './styles.css'


class EditComment extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            inputs: {}
        }
    }

    componentDidMount () {
        const { getComment, match } = this.props
        getComment(match.params.comment)
            .then(data => {
                this.setState({isLoading: false})
            })
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
            const { editComment, match, comment, history } = this.props
            const { inputs } = this.state
            const postId = comment.parentId
            editComment(match.params.comment, inputs.comment.value)
                .then(history.push(`/posts/${postId}`))
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
        } else if (Object.keys(comment).length === 0 || comment.delete || comment.parentDelete) {
            return (
                <section className='editcomment-container'>
                    <p className='editcomment-container-text'>
                        Comment does not exist. This could be deleted or failed comment route
                    </p>
                </section>
            )
        }
        return (
            <section className='editcomment-container'>
                <h1 className='newitem-form-container-title'>
                    Edit comment
                </h1>
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

const mapDispatchToProps = dispatch => ({
    getComment: comment => dispatch(getComment(comment)),
    editComment: (id, body) => dispatch(editComment(id, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)