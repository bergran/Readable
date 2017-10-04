import React from 'react'
import CategoryItem from '../CategoryItem'
import PostItem from '../PostItem'
import CommentItem from '../CommentItem'

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