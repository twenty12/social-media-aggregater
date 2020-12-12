import React, { FunctionComponent } from "react"
import { Post } from '../../redux/modules/posts'
import { Account } from '../../redux/modules/teams'

type PostProps = {
    postData: Post,
    accountData: Account
    // sailorData: Sailor,
    // boatData: Boat
}

var nameToEmoji: { [key: string]: string; } = {
    UK: '🇬🇧',
    JPN: '🇯🇵',
};


const PostCard: FunctionComponent<PostProps> = ({ postData, accountData }) => {
    const header = () => {
        if (Object.keys(accountData).length != 0) {
            return (
                <div className="d-flex">
                    <div className="mr-auto">{accountData.sailor.name} {nameToEmoji[accountData.flag]}</div>

                    {/* <small>{accountData.sailor.boat}</small> */}
                </div>
            )
        }
    }
    const created: Date = new Date(postData.created)
    return (
    <div key={postData.id} className="row justify-content-center">
        <div className="my-2 col-8">
            <div className="card border-dark">
                <div className="card-header bg-white border-0">
                    {header()}
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
                <div className="card-footer bg-white border-0 pt-0">
                    <small>{created.toLocaleString()}</small>
                </div>
            </div>
        </div>
    </div>
)
}
export default PostCard