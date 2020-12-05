import React, {useEffect} from 'react';
import PostItem from './Post'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts, PostState } from "../../redux/modules/posts"

import {RootState} from "../../redux/reducer"

export default function Feed() {
    // useEffect(() => {
    //     store.dispatch(loadPosts() as any)
    // }, [])
    const posts = useSelector( (state: RootState) => state.post.posts);
    console.log('posts')
    console.log(posts)
    const postItems = posts.map((post) => {
        return <PostItem />
      })
    return (
        <div>
            {postItems}
        </div>
    )
}