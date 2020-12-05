import React from 'react';
import { loadProducts } from "./redux/modules/products"
import store, { loadPosts, addPosts } from "./redux/modules/posts"
import { useSelector, useDispatch } from "react-redux"
import NavBar from "./common/NavBar"
import './App.css';


function App() {
    const count = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(store)
    const product = [{
        id: 2,
        flag: 'Cool Headphones',
        position: 4999,
        img: 'https://placeimg.com/640/480/tech/5',
    }]
    return (
        <div>
            <NavBar />
            <button onClick={() => store.dispatch(loadPosts() as any)}>Load em</button>
        </div>
    );
}

export default App;
