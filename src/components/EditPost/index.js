import React, { Component } from 'react'
import NewItem from '../NewItem'
import { connect } from 'react-redux'
import { getPost } from '../../thunks/thunks'
import { LoadingItem } from '../LoadingItem';

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
                <NewItem
                    initialAuthor={post.author}
                    initialTitle={post.title}
                    initialItem={post.body}
                    item='post'
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
    getPost: post => dispatch(getPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)