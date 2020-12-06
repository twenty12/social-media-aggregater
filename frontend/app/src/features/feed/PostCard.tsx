import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'

type PostProps = {
    data: Post
}

const PostCard: FunctionComponent<PostProps> = ({ data }) => {
    return (
        <div className="card">
                <div className="card-body">Basic card</div>
        </div>
    )
}
export default PostCard