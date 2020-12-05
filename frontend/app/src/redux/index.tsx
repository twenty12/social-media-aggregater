import { combineReducers } from 'redux';
import { userReducer } from './modules/users';
import { productsReducer } from './modules/products';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer
});
export type RootState = ReturnType<typeof rootReducer>;