import React, {useEffect, FunctionComponent} from 'react';
import PostCard from './PostCard'
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
    const keyedSailor = {1: {sailorName: 'Pip'}} //you need to make boats and sailors into keyed objects so you don't just loop through them everytime
    var keySailors = sailors.reduce(function(acc: any, cur: any, i: number) {
        acc[cur['id']] = cur;
        return acc;
      }, {});
    const postItems = posts.map((post) => {
        return <PostCard data={post}/>
      })
      return (
        <div className="container">
            {postItems}
        </div>
    )
}

export default Feed