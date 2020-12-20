import React, { useEffect, FunctionComponent, useState, useRef } from 'react'
import PostCard from './PostCard'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts, toggleInfo } from "../../redux/modules/posts"
import { loadAccounts, Account } from "../../redux/modules/teams"
import { RootState } from "../../redux/reducer"
import { AiOutlineInfoCircle } from 'react-icons/ai';

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
    const showInfo = useSelector((state: RootState) => state.post.showInfo)
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
    const getDateString = (updated: string) => {
        const created: Date = new Date(updated)
        return created.toLocaleString()
    }
    const getInfoCard = () => {
        console.log(accounts)
        if (showInfo) {
            return (
                <div className="col-sm-12 mt-1 col-md-8 d-flex">
                    <div className="card border-dark w-100 ">
                        <div className="card-body py-1">
                            <div><small>Accounts monitored: {Object.keys(accounts).length}</small></div>
                            <div><small>Last updated: { (Object.keys(accounts).length < 2 ? 'a' : getDateString(accounts['1'].updated))}</small></div>
                            {/* <div><small>Last updated race positions: { (Object.keys(accounts).length < 2 ? 'a' : getDateString(accounts['1'].updated))}</small></div> */}
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 mt-1 col-md-8 d-flex">
                    <AiOutlineInfoCircle onClick={() => dispatch(toggleInfo() as any)} />
                </div>
                {getInfoCard()}
            </div>
            {postItems}
            {loadingDiv}
            <div ref={ref}></div>
        </div>
    )
}

export default Feed