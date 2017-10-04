import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { Capitalize } from '../../utils/tools'
import { updaterThunk ,fillPostCategoryThunk } from "../../thunks/thunks";

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
        fillPosts(updateTime, category)
            .then(data => {
                this.setState({isLoading: false})
            })
    }

    render () {
        const { posts, history, match } = this.props
        const { isLoading } = this.state
        return (
            <section>
                <h1>{ Capitalize(match.params.category) }</h1>
                <section>
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
    const fillPosts = updaterThunk(fillPostCategoryThunk)
    return {
        fillPosts: (time, category)=> dispatch(fillPosts(time, category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)