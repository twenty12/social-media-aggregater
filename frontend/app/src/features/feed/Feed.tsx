import React, { useEffect, FunctionComponent } from 'react'
import PostCard from './PostCard'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts } from "../../redux/modules/posts"
import { loadAccounts } from "../../redux/modules/teams"
import { RootState } from "../../redux/reducer"

const arrToObjKeyedById = (arr: any) => {
    return arr.reduce(function (acc: any, cur: any, i: number) {
        acc[cur['id']] = cur;
        return acc;
    }, {});
}

const Feed: FunctionComponent = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAccounts() as any)
        dispatch(loadPosts() as any)
        // dispatch(loadBoats() as any)
    }, [])
    const posts = useSelector((state: RootState) => state.post.posts)
    const loading = useSelector((state: RootState) => state.post.loading)
    const accounts = arrToObjKeyedById(
        useSelector((state: RootState) => state.team.accounts))

    const postItems = posts.map((post) => {
        const getAccountDataWhenOnceAvailable = () => (Object.keys(accounts).length === 0) ? {} : accounts[post.account!]
        // const getBoatDataWhenOnceAvailable = () => (Object.keys(boats).length === 0) ? {} : boats[post.boatId!]
        return <PostCard
            postData={post}
            accountData={getAccountDataWhenOnceAvailable()} />
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