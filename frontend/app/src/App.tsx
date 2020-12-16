import React from 'react';
import NavBar from "./features/Header"
import Feed from "./features/feed/Feed"
import './App.css';
import { loadPosts } from "./redux/modules/posts"
import {useDispatch, useSelector} from "react-redux"
import './index.css';
import { RootState } from "./redux/reducer"

function App() {
    const dispatch = useDispatch()
    const pageNumber = useSelector((state: RootState) => state.post.pageNumber)

    return (
        <div>
            <NavBar />
            <button onClick={() => dispatch(loadPosts(pageNumber) as any)}>Load em</button>
            <Feed />
        </div>
    );
}

export default App;
