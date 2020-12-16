import React, { FunctionComponent, useEffect, useState } from "react"
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
    DE: '🇩🇪',
    FRN: '🇫🇷',
};


const PostCard: FunctionComponent<PostProps> = ({ postData, accountData }) => {
    const [showThumb, setShowThumb] = useState(true)
    const header = () => {
        const created: Date = new Date(postData.created)
        if (Object.keys(accountData).length != 0) {
            const position = accountData.sailor.boat?.position === 0 ? 'RET' : accountData.sailor.boat?.position
            return (
                <div>
                    <div className="d-flex">
                        <div className="mr-auto">{accountData.sailor.name}</div>
                        <small><div>{created.toLocaleString()}</div></small>
                    </div>
                    <small><i>{accountData.sailor.boat?.name} {nameToEmoji[accountData.flag]}</i></small><br></br>
                    <small>Position: {position}</small>
                </div>
            )
        }
    }

    const handleClick = () => setShowThumb(false)
    const thumbDiv = <img className="img-fluid" src={`https://img.youtube.com/vi/${postData.source_id}/maxresdefault.jpg`} />
    const videoDiv = <div className="embed-responsive embed-responsive-16by9">
        <iframe
            className="embed-responsive-item border-0"
            src={`https://www.youtube.com/embed/${postData.source_id}?&autoplay=1`}
            allow='autoplay; encrypted-media'
            title='video'
        />
    </div>

    return (
        <div key={postData.id} className="row justify-content-center">
            <div className="my-2 col-8">
                <div className="card border-dark">
                    <div className="card-header bg-white border-0 pb-0">
                        {header()}
                    </div>
                    <div onClick={handleClick} className="card-body">
                    { showThumb ? thumbDiv : videoDiv }
                    </div>
                    <div className="card-footer bg-white border-0 pt-0">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard