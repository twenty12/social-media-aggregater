import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'

type PostProps = {
    data: Post
}

const PostItem: FunctionComponent<PostProps> = ({ data }) => {
    return (
        <h1>{data.id}</h1>
    )
}
export default PostItem