import React from 'react';
import NavBar from "./features/Header"
import Feed from "./features/feed/Feed"
import './App.css';
import { loadPosts } from "./redux/modules/posts"
import {useDispatch, useSelector} from "react-redux"
import './index.css';
import { RootState } from "./redux/reducer"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  
function App() {
    const dispatch = useDispatch()
    const pageNumber = useSelector((state: RootState) => state.post.pageNumber)

    return (
        <Router>

            {/* <button onClick={() => dispatch(loadPosts(pageNumber) as any)}>Load em</button> */}
            <Switch>

                <Route path="/race/:eventSlug">
                    <NavBar />
                    <Feed />
                </Route>
                <Route path="/">
                    <Link to="race/vendee-globe">vendee</Link>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
