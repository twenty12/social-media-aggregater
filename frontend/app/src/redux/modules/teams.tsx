import { typedAction } from './index';
import { Dispatch, AnyAction } from 'redux';
const getServerUrl = () => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://localhost:8000/'
    } else {
        return 'https://social-media-aggregater.herokuapp.com/'
    }
}
export type Account = {
    id: number,
    sailor: Sailor,
    team?: Team,
    platform: string,
    account_id: string,
    name: string,
    flag: string,
    updated: string
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
    name?: string,
    built: string,
    position?: number
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

export const loadAccounts = (eventSlug:string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        fetch(getServerUrl() + "api/accounts/?events__name=" + eventSlug)
            .then(res => res.json())
            .then((result) => {
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