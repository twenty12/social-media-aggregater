import React, { useEffect, FunctionComponent, useState, useRef } from 'react'
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

function useOnScreen(ref: any) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }

const Feed: FunctionComponent = () => {
    const dispatch = useDispatch()
    const pageNumber = useSelector((state: RootState) => state.post.pageNumber)
    useEffect(() => {
        dispatch(loadAccounts() as any)
        dispatch(loadPosts(pageNumber) as any)
        // dispatch(loadBoats() as any)
    }, [])
    const posts = useSelector((state: RootState) => state.post.posts)
    const loading = useSelector((state: RootState) => state.post.loading)
    const loadingDiv = (loading) ? <h1>Loading...</h1> : ''
    const accounts = arrToObjKeyedById(
        useSelector((state: RootState) => state.team.accounts))

    const postItems = posts.map((post) => {
        const getAccountDataWhenOnceAvailable = () => (Object.keys(accounts).length === 0) ? {} : accounts[post.account!]
        // const getBoatDataWhenOnceAvailable = () => (Object.keys(boats).length === 0) ? {} : boats[post.boatId!]
        return <PostCard
            postData={post}
            accountData={getAccountDataWhenOnceAvailable()} />
    })

    const ref = useRef<HTMLHeadingElement>(null);
    const isVisible = useOnScreen(ref)
    if (isVisible && pageNumber > 1) {
        console.log('loaded')
        dispatch(loadPosts(pageNumber) as any)
    }
    const handleScroll = (e:any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            console.log('bottom')
         }
      }
        return (
            <div onScroll={handleScroll} className="container">
                {postItems}
                {loadingDiv}
                <div ref={ref}></div>
            </div>
        )
}

export default Feed