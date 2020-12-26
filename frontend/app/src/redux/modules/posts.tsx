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
    thumbnail?: string,
}

export type PostState = {
    posts: Post[];
    loading: boolean;
    pageNumber: number;
    showInfo: boolean;
};

const initialState: PostState = {
    posts: [],
    loading: true,
    pageNumber: 1,
    showInfo: false
};

const getServerUrl = () => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:8000/'
    } else {
        return 'https://social-media-aggregater.herokuapp.com/'
    }
}

const getPageUrl = (pageNumber:number, eventSlug:string) => {
    return getServerUrl() + "api/posts/?page=" + pageNumber + '&account__events__name=' + eventSlug
}
export const addPosts = (products: Post[]) => {
    return typedAction('posts/ADD_POSTS', products);
};

export const loadPosts = (pageNumber:number, eventSlug:string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        fetch(getPageUrl(pageNumber, eventSlug))
            .then(res => res.json())
            .then((result) => {
                dispatch(
                    addPosts(result['results'])
                );
            })
    };
};

interface ActionB {
    type: 'posts/TOGGLE_INFO';
}
export const toggleInfo = () => {
    return typedAction('posts/TOGGLE_INFO');
};

type PostAction = ReturnType<typeof addPosts> | ActionB;

export function postReducer(
    state = initialState,
    action: PostAction
): PostState {
    switch (action.type) {
        case 'posts/ADD_POSTS':
            return {
                ...state,
                loading: false,
                pageNumber: state.pageNumber + 1,
                posts: [...state.posts, ...action.payload],
            };
        case 'posts/TOGGLE_INFO':
            return {
                ...state,
                showInfo: !state.showInfo
            };
        default:
            return state;
    }
}