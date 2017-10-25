import React, { Component } from 'react'
import NewItem from '../NewItem'
import { connect } from 'react-redux'
import { getPost, editPost } from '../../thunks/thunks'
import { LoadingItem } from '../LoadingItem';
import './styles.css'
import {deleteChildren} from "../../actions/popup";

class EditPost extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            inputs: {}
        }
    }

    componentDidMount () {
        const { getPost, post } = this.props
        getPost(post.id)
            .then(data => {
                this.setState({isLoading: false})
            })
            .catch(data => {
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
            const { postId, editPost, closeModal } = this.props
            const { inputs } =  this.state
            editPost(postId, inputs.title.value, inputs.post.value)
                .then(data => {
                    closeModal()
                })
        }
    }

    areValid = () => {
        const { inputs } = this.state
        const keys = Object.keys(inputs)
        return keys.filter(key => inputs[key].isValid).length === keys.length
    }

    render () {
        const { post } = this.props
        const { isLoading } = this.state

        if (isLoading) {
            return (
                <section className="editpost-container">
                    <LoadingItem />
                </section>
            )
        }

        return (
            <section className='editpost-container'>
                <h1 className='newitem-form-container-title'>
                    Edit post
                </h1>
                <NewItem
                    initialAuthor={post.author}
                    initialTitle={post.title}
                    initialItem={post.body}
                    item='post'
                    label='Post'
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    isValid={this.areValid()}
                    edit
                />
            </section>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    getPost: post => dispatch(getPost(post)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body)),
    closeModal: () => dispatch(deleteChildren())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)