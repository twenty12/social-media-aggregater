import { typedAction } from './index';
import { Dispatch, AnyAction } from 'redux';
import { createImportSpecifier } from 'typescript';


export type Post = {
    id: number,
    account: number,
    created: string,
    collected: string,
    title: string,
    description: string,
    url: string
    source_id?: string,
}

export type PostState = {
    posts: Post[];
    loading: boolean;
};

const initialState: PostState = {
    posts: [],
    loading: true,
};

const getServerUrl = () => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:8000/'
    } else {
        return 'https://social-media-aggregater.herokuapp.com/'
    }
}

export const addPosts = (products: Post[]) => {
    return typedAction('posts/ADD_POSTS', products);
};

export const loadPosts = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        fetch(getServerUrl() + "api/posts/")
            .then(res => res.json())
            .then((result) => {
                dispatch(
                    addPosts(result['results'])
                );
            })
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
                loading: false,
                posts: [...state.posts, ...action.payload],
            };
        default:
            return state;
    }
}