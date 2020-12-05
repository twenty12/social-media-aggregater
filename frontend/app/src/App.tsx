import React, { useEffect } from 'react';
import NavBar from "./features/NavBar"
import Feed from "./features/feed"
import './App.css';
import { loadPosts } from "./redux/modules/posts"
import {useSelector, useDispatch} from "react-redux"

function App() {
    const dispatch = useDispatch()

    return (
        <div>
            <NavBar />
            <button onClick={() => dispatch(loadPosts() as any)}>Load em</button>
            <Feed />
        </div>
    );
}

export default App;
