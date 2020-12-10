import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'
import { Boat, Sailor } from '../../redux/modules/teams'

type PostProps = {
    postData: Post,
    // sailorData: Sailor,
    // boatData: Boat
}

var nameToEmoji: { [key: string]: string; } = {
    UK: '🇬🇧'
};


const PostCard: FunctionComponent<PostProps> = ({ postData }) => {
    return (
        <div key={postData.id} className="row justify-content-center">
            <div className="my-2 col-8">
                <div className="card border-dark">
                    <div className="card-header bg-white border-0">
                        {/* <div className="d-flex">
                            <div className="mr-auto">{sailorData.name}</div>
                            {nameToEmoji[boatData.flag]}
                        </div>
                        <small>{boatData.name}</small> */}
                    </div>
                    <div className="card-body">
                        <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item border-0"
                            src={`https://www.youtube.com/embed/${postData.source_id}`}
                            allow='autoplay; encrypted-media'
                            title='video'
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard