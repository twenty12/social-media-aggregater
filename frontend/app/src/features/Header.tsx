import React from 'react';
import {useParams} from "react-router-dom"
interface ParamTypes {
    raceSlug: string
  }

const raceSlugToName: { [key: string]: string; } = {
    'vendee-globe': 'Vendee Globe'
}
export default function NavBar () {
    const { raceSlug } = useParams<ParamTypes>()
    const createdTag = <small>By <a className="text-black" href="http://danielgladstone.com">Daniel Gladstone</a></small>
    return (
        <nav className="navbar navbar-default border-bottom">
                <div className="w-100">
                    <div className="d-flex">
                        <span className="navbar-brand text-wrap">
                            <h1>{raceSlugToName[raceSlug]}</h1>
                        </span>
                    </div>
                    <div className="d-flex w-100 align-items-end">
                        <h4 className="mb-0">All the content</h4>
                        <div className="ml-auto d-flex align-items-end">
                            {createdTag}
                        </div>
                    </div>
                </div>
        </nav>
    )
}