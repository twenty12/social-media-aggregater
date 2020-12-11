import { typedAction } from './index';
import { Dispatch, AnyAction } from 'redux';

import {sailorData, boatData} from "./mock_data"

export type Account = {
    id: number,
    sailor: Sailor,
    team?: Team,
    platform: string,
    account_id: string,
    account_name: string,
    flag: string
}

export type Sailor = {
    id: number,
    name: string,
    gender: string
    age: number,
    boat?: Boat,
    team?: Team
}

export type Boat = {
    id: number,
    name: string,
    built: string
}

export type Team = {
    name: string,
    boat: Boat
};

export type AccountState = {
    accounts: Account[]
}

const initialState: AccountState = {
    accounts: []
};

export const addAccount= (account:Account[]) => {
    return typedAction('teams/ADD_ACCOUNT', account);
};

// export const addBoat = (boat:Boat[]) => {
//     return typedAction('teams/ADD_BOAT', boat);
// };

// export const loadBoats = () => {
//     return (dispatch: Dispatch<AnyAction>) => {
//         setTimeout(() => {
//             dispatch(
//                 addBoat(boatData['boats'])
//             );
//         }, 1000);
//     };
// };

export const loadAccounts = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        fetch("http://localhost:8000/api/accounts/")
            .then(res => res.json())
            .then((result) => {
                console.log(result['results'])
                dispatch(
                    addAccount(result['results'])
                );
            })
    };
};

type ActionType = ReturnType<typeof addAccount>;

export function teamReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'teams/ADD_ACCOUNT':
            return {
                ...state,
                accounts: [...state.accounts, ...action.payload],
            };
        default:
            return state;
    }
}