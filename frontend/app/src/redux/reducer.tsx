import { combineReducers } from 'redux';
import { postReducer, PostState } from './modules/posts';

export const rootReducer = combineReducers({
    post: postReducer
});

export type RootState = ReturnType<typeof rootReducer>;