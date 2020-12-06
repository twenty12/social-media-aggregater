import { combineReducers } from 'redux';
import { postReducer } from './modules/posts';
import { teamReducer } from './modules/teams';

export const rootReducer = combineReducers({
    post: postReducer,
    team: teamReducer
});

export type RootState = ReturnType<typeof rootReducer>;