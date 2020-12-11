import React from 'react';
import NavBar from "./features/Header"
import Feed from "./features/feed/Feed"
import './App.css';
import { loadPosts } from "./redux/modules/posts"
import {useDispatch} from "react-redux"
import './index.css';

function App() {
    const dispatch = useDispatch()

    return (
        <div>
            <NavBar />
            {/* <button onClick={() => dispatch(loadPosts() as any)}>Load em</button> */}
            <Feed />
        </div>
    );
}

export default App;
