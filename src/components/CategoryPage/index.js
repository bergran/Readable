import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { Capitalize } from '../../utils/tools'
import { updaterThunk ,fillPostCategoryThunk } from "../../thunks/thunks";
import { Link } from 'react-router-dom'
import './styles.css'
import '../../assest/font-awesome/css/font-awesome.min.css'

class CategoryPage extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount () {
        const { match, fillPosts, updateTime } = this.props
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
            <section>
                <section className='category-page-header'>
                    <h1 className='category-page-header-title'>{ Capitalize(match.params.category) }</h1>
                    <section className='category-page-create-post-section'>
                        <Link to={`/categories/${match.params.category}/add`} className='category-page-button category-page-button-text'>
                            <i className='fa fa-plus-circle' aria-hidden="true"></i>
                        </Link>
                    </section>
                </section>
                <section className='category-page-posts'>
                    {
                        !isLoading ?
                            <ListItems
                                type='posts'
                                items={posts}
                                push={history.push}
                            />
                            :
                            <section>
                                Loading...
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
        fillPosts: category => dispatch(fillPostCategoryThunk(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)