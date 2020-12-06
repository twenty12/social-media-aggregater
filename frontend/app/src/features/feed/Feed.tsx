import React, {useEffect, FunctionComponent} from 'react';
import PostItem from './Post'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts } from "../../redux/modules/posts"
import { loadBoats, loadSailors } from "../../redux/modules/teams"

import {RootState} from "../../redux/reducer"

const Feed: FunctionComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts() as any)
        dispatch(loadSailors() as any)
        dispatch(loadBoats() as any)
    }, [])
    const posts = useSelector( (state: RootState) => state.post.posts);
    const sailors = useSelector( (state: RootState) => state.team.sailors);
    const boats = useSelector( (state: RootState) => state.team.boats);

    const postItems = posts.map((post) => {
        return <PostItem data={post}/>
      })
      return (
        <div className="container">
            {postItems}
        </div>
    )
}

export default Feed