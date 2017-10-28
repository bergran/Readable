import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { Capitalize } from '../../utils/tools'
import { fillPostCategoryThunk, createPost } from "../../thunks/thunks";
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'
import { LoadingItem } from '../LoadingItem'
import {deleteChildren, updateChildren} from "../../actions/popup";
import CreatePost from '../CreatePost'
import Dialog from '../Dialog'


/**
* Component that renders a category page, category page is a container linked to redux. CategoryPage has a post list
* about category id. With category page, user can create a post clicking into the button, the button will active a
* popup with a new post form
*
*
* @param posts(array): contains all post from category id
*
* @action fillPost(func): dispatch fillPost action
* @action updateChildren(func): dispatch function from mapDispatchToProps that activate/change popup
* @action closePopup(func): dispatch function from mapDispatchToProps that closePopup
* @action addPost(func): dispatch function from mapDispatchToProps that add a new post
*
* @state isLoading(bool): is a flag to know the page that is loading
* */

class CategoryPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    handleCreatePost = () => {
        const { updateChildren, match, closePopup, addPost } = this.props
        const dialog = (
            <Dialog>
                <CreatePost
                    category={match.params.category}
                    closePopup={closePopup}
                    addPost={addPost}
                />
            </Dialog>
        )
        updateChildren(dialog)
    }

    componentDidMount () {
        const { match, fillPosts } = this.props
        const category = match.params.category
        fillPosts(category)
            .then(data => {
                this.setState({isLoading: false})
            })
    }

    render () {
        const { posts, history, match } = this.props
        const { isLoading } = this.state
        return (
            <section className={'category-page-container'}>
                <section className='category-page-header'>
                    <h1 className='category-page-header-title'>{ Capitalize(match.params.category) }</h1>
                    <section className='category-page-create-post-section'>
                        <button
                            className={'category-page-button category-page-button-text'}
                            onClick={this.handleCreatePost}
                        >
                            <i className='fa fa-plus-circle' aria-hidden="true"></i>
                        </button>
                    </section>
                </section>
                <section className='category-page-posts'>
                    {
                        !isLoading ?
                            <ListItems
                                type='posts'
                                items={posts}
                                push={history.push}
                                sortAttrs={[
                                    {value: '-timestamp', title: 'newest'},
                                    {value: 'timestamp', title: 'oldest'},
                                    {value: '-voteScore', title: 'max-vote'},
                                    {value: 'voteScore', title: 'min-vote'}
                                ]}
                            />
                            :
                            <section>
                                <LoadingItem />
                            </section>

                    }
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { category } = ownProps.match.params
    const posts = state.posts.filter(post => post.category === category && !post.deleted)
    return {
        posts: posts,
        updateTime: state.updateTime
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fillPosts: category => dispatch(fillPostCategoryThunk(category)),
        updateChildren: dialog => dispatch(updateChildren(dialog)),
        closePopup: () => dispatch(deleteChildren()),
        addPost: post => dispatch(createPost(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)