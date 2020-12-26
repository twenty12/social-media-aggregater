import React from 'react';
import {useParams, Link} from "react-router-dom"

export interface ParamTypes {
    eventSlug: string
  }

const raceSlugToName: { [key: string]: string; } = {
    'vendee-globe': 'Vendée Globe',
    'americas-cup': "America's Cup"
}
export default function NavBar () {
    const { eventSlug } = useParams<ParamTypes>()
    const createdTag = <small>By <a className="text-black" href="http://danielgladstone.com">Daniel Gladstone</a></small>
    return (
        <nav className="navbar navbar-default border-bottom">
            <div className="">
                <h1 className="mb-n3"><Link to="/">Spun</Link> | {raceSlugToName[eventSlug]}</h1>
                <br></br>
                <div className="mb-n2 mt-n1">
                    {/* {createdTag} */}
                </div>


            </div>
        </nav>
    )
}