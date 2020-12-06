import React, {useEffect, FunctionComponent} from 'react';
import PostItem from './Post'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts } from "../../redux/modules/posts"

import {RootState} from "../../redux/reducer"

const Feed: FunctionComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts() as any)
    }, [])
    const posts = useSelector( (state: RootState) => state.post.posts);
    const postItems = posts.map((post) => {
        return <PostItem data={post}/>
      })

      return (
        <div>
            {postItems}
        </div>
    )
}

export default Feed