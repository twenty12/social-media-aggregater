import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'
import { Boat, Sailor } from '../../redux/modules/teams'

type PostProps = {
    postData: Post,
    sailorData: Boat,
    boatData: Sailor
}
type EmojiProps = {
    flag: string,
}

var nameToEmoji: { [key: string]: string; } = {
    UK: '🇬🇧'
};

const PostCard: FunctionComponent<PostProps> = ({ postData, sailorData, boatData }) => {
    console.log(boatData)
    return (
        <div key={postData.id} className="card my-2">
            <div className="card-header">
                {nameToEmoji['UK']} {sailorData.name} 
            </div>
                <div className="card-body">Basic card</div>
        </div>
    )
}
export default PostCard