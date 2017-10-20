import React, { Component } from 'react'
import NewItem from '../NewItem'
import { connect } from 'react-redux'
import { getPost, editPost } from '../../thunks/thunks'
import { LoadingItem } from '../LoadingItem';
import './styles.css'

class EditPost extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true,
            inputs: {}
        }
    }

    componentDidMount () {
        const { getPost, match } = this.props
        getPost(match.params.post)
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
            const { match, editPost, history } = this.props
            const { inputs } =  this.state
            const postId = match.params.post
            editPost(postId, inputs.title.value, inputs.post.value)
                .then(data => {
                    history.push(`/posts/${postId}`)
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
                <LoadingItem />
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

const mapStateToProps = (state, ownprops) => {
    const postId = ownprops.match.params.post
    const post = state.posts.filter(post => post.id === postId)
    return {
        post: post.length === 1 ? post[0] : {id: postId}
    }
}

const mapDispatchToProps = dispatch => ({
    getPost: post => dispatch(getPost(post)),
    editPost: (id, title, body) => dispatch(editPost(id, title, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)