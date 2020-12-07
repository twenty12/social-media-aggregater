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


//TODO figure out why boatdata is now wokring
const PostCard: FunctionComponent<PostProps> = ({ postData, sailorData, boatData }) => {
    // console.log(type boatData)
    return (
        <div key={postData.id} className="row justify-content-center">
            <div className="my-2 col-8">
                <div className="card border-dark">
                    <div className="card-header bg-white border-0">
                        <div className="d-flex">
                            <div className="mr-auto">{sailorData.name}</div>
                            <div>{nameToEmoji['UK']}</div>
                        </div>
                        <small>Boat: Position: 4 Flag: </small>
                    </div>
                    <div className="card-body">
                        <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                            className="embed-responsive-item border-0"
                            src={`https://www.youtube.com/embed/${postData.sourceId}`}
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