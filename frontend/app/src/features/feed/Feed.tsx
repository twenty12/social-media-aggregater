import React, { useEffect, FunctionComponent, useState, useRef } from 'react'
import PostCard from './PostCard'
import { useSelector, useDispatch } from "react-redux"
import { loadPosts, toggleInfo } from "../../redux/modules/posts"
import { loadAccounts, Account, clockElapsedTime, startCounter } from "../../redux/modules/teams"
import { RootState } from "../../redux/reducer"
import { AiOutlineInfoCircle } from 'react-icons/ai';
import {useParams, Link} from "react-router-dom"
import {ParamTypes} from "../Header"

const arrToObjKeyedById = (arr: any) => {
    return arr.reduce(function (acc: any, cur: any, i: number) {
        acc[cur['id']] = cur;
        return acc;
    }, {});
}
const padToTwo = (number: number) => number <= 9999 ? `000${number}`.slice(-2) : number;

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
    const timePassedSinceUpdate = useSelector((state: RootState) => state.team.timePassedSinceUpdate)
    const counting = useSelector((state: RootState) => state.team.counting)
    const {eventSlug} = useParams<ParamTypes>()

    const showInfo = useSelector((state: RootState) => state.post.showInfo)
    useEffect(() => {
        dispatch(loadAccounts(eventSlug) as any)
        dispatch(loadPosts(pageNumber, eventSlug) as any)
        // dispatch(loadBoats() as any)
    }, [])

    useEffect(() => {
        if (counting){
            const interval = setInterval(() => {
                dispatch(clockElapsedTime() as any)
              }, 1000);
              return () => clearInterval(interval);
            }
      }, [counting]);


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
        dispatch(loadPosts(pageNumber, eventSlug) as any)
    }
    const getDateString = (updated: string) => {
        const created: Date = new Date(updated)
        return created.toLocaleString()
    }
    const getTimeElapsed = (updated: string) => {
        if (!counting) {
            dispatch(startCounter() as any)
        }
        const created: Date = new Date(updated)
        const current: Date = new Date()
        var timeDiff: number = current.getTime() - created.getTime()

        timeDiff /= 1000;
        var seconds = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);
        var minutes = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);
        var hours = Math.round(timeDiff % 24);
        timeDiff = Math.floor(timeDiff / 24);

        return padToTwo(hours) + ":" + padToTwo(minutes) + ":" + padToTwo(seconds)
    }
    const getInfoCard = () => {
        if (showInfo) {
            return (
                <div className="col-sm-12 mt-1 col-md-8 d-flex">
                    <div className="card border-dark w-100 ">
                        <div className="card-body py-1">
                            <div><small>Accounts monitored: {Object.keys(accounts).length}</small></div>
                            <div><small>Time since YouTube check: { (Object.keys(accounts).length < 2 ? '' : getTimeElapsed(accounts[Object.keys(accounts)[0]].updated))}</small></div>
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