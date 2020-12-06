import React, {useEffect} from 'react';
import PostItem from './Post'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts } from "../../redux/modules/posts"

import {RootState} from "../../redux/reducer"

export default function Feed() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts() as any)
    }, [])
    const posts = useSelector( (state: RootState) => state.post.posts);
    const postItems = posts.map((post) => {
        return <PostItem />
      })
    return (
        <div>
            {postItems}
        </div>
    )
}