import { typedAction } from './index';
import { Dispatch, AnyAction, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

import {feedUpdate} from "./mock_data"

export type Post = {
    id: number,
    source: string,
    publishTime: string,
    title: string,
    description: string,
    image: string,
    url: string
}

export type PostState = {
    posts: Post[];
    loading: boolean;
};

const initialState: PostState = {
    posts: [],
    loading: true,
};

export const addPosts = (products: Post[]) => {
    return typedAction('posts/ADD_POSTS', products);
};

export const loadPosts = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        setTimeout(() => {
            dispatch(
                addPosts(feedUpdate['posts'])
            );
        }, 1000);
    };
};

type PostAction = ReturnType<typeof addPosts>;

export function postReducer(
    state = initialState,
    action: PostAction
): PostState {
    switch (action.type) {
        case 'posts/ADD_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        default:
            return state;
    }
}
// const store = createStore(postReducer, applyMiddleware(thunk))
// store.subscribe(() => console.log(store.getState()))
// export default store