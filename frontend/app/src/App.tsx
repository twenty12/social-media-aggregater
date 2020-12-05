import React, { useEffect } from 'react';
import NavBar from "./features/NavBar"
import Feed from "./features/feed"
import './App.css';
import store, { loadPosts } from "./redux/modules/posts"

function App() {
    return (
        <div>
            <NavBar />
            <button onClick={() => store.dispatch(loadPosts() as any)}>Load em</button>
            <Feed />
        </div>
    );
}

export default App;
