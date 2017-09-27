import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItems from "../ListItems/index";
import { Capitalize } from '../../utils/tools'
import { fillPostsThunk } from "../../thunks/thunks";

class CategoryPage extends Component {

    componentDidMount () {
        if (this.props.posts.length > 0) {
            console.log('qewr')
        } else {
            const { match, fillPostByCategory } = this.props
            const category = match.params.category
            fillPostByCategory(category)
        }

    }

    render () {
        const { posts, history, match } = this.props
        return (
            <section>
                <h1>{ Capitalize(match.params.category) }</h1>
                {
                    posts.length > 0 ?
                        <ListItems
                            type='post'
                            items={posts}
                            push={history.push}
                        />
                            :
                        <section>
                            No Posts :(
                        </section>

                }

            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { category } = ownProps.match.params
    const posts = state.posts.filter(post => post.category === category && !post.deleted)
    return {
        posts: posts
    }
}

const mapDispatchToProps = dispatch => ({
    fillPostByCategory: category => dispatch(fillPostsThunk(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)