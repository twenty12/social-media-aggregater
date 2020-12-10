import React, {useEffect, FunctionComponent} from 'react'
import PostCard from './PostCard'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts } from "../../redux/modules/posts"
import { loadBoats, loadSailors } from "../../redux/modules/teams"

import {RootState} from "../../redux/reducer"

const arrToObjKeyedById = (arr: any) => {
    return arr.reduce(function(acc: any, cur: any, i: number) {
        acc[cur['id']] = cur;
        return acc;
      }, {});
}

const Feed: FunctionComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadPosts() as any)
        // dispatch(loadSailors() as any)
        // dispatch(loadBoats() as any)
    }, [])
    const posts = useSelector( (state: RootState) => state.post.posts)
    const loading = useSelector( (state: RootState) => state.post.loading)
    // const sailors = arrToObjKeyedById(
        // useSelector( (state: RootState) => state.team.sailors))
    // const boats = arrToObjKeyedById(
        // useSelector( (state: RootState) => state.team.boats))

    const postItems = posts.map((post) => {
        // const getSailorDataWhenOnceAvailable = () => (Object.keys(sailors).length === 0) ? {} : sailors[post.sailorId!]
        // const getBoatDataWhenOnceAvailable = () => (Object.keys(boats).length === 0) ? {} : boats[post.boatId!]
        return <PostCard postData={post} />
            // sailorData={getSailorDataWhenOnceAvailable()}
            // boatData={getBoatDataWhenOnceAvailable()}/>
      })
      if (loading) {
          return <h1>Loading...</h1>
      } else {
        return (
            <div className="container">
                {postItems}
            </div>
        )
    }
}

export default Feed