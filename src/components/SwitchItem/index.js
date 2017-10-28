import React from 'react'
import CategoryItem from '../CategoryItem'
import PostItem from '../PostItem'
import CommentItem from '../CommentItem'

/**
*
* Component used for switch categories, posts or comments inside ListItems
*
* @param type(string): item type
* @param {...props}(object): contain information about item that want to render
*
* */


export const SwitchItem = (props) => {
    const { type } = props;
    let params = {...props}
    delete params.type
    switch (type) {
        case 'categories':
            return <CategoryItem {...props}/>
        case 'posts':
            return <PostItem {...props}/>
        case 'comments':
            return <CommentItem {...props}/>
        default:
            return null
    }
}