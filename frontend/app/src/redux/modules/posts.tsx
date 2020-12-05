import { typedAction } from './index';
import { Dispatch, AnyAction, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"


type Post = {
    id: number;
    flag: string;
    position: number;
    img: string;
};

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
            console.log('add again')
            // Pretend to load an item
            dispatch(
                addPosts([
                    {
                        id: 1,
                        flag: 'UK',
                        position: 33,
                        img: 'https://placeimg.com/640/480/tech/5',
                    },
                ])
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
            console.log('adding posts')
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        default:
            return state;
    }
}
const store = createStore(postReducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))
export default store