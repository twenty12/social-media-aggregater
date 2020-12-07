import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'
import { Boat, Sailor } from '../../redux/modules/teams'

type PostProps = {
    postData: Post,
    sailorData: Boat,
    boatData: Sailor
}

const PostCard: FunctionComponent<PostProps> = ({ postData, boatData, sailorData }) => {
    return (
        <div className="card">
                <div className="card-body">Basic card</div>
        </div>
    )
}
export default PostCard