import { typedAction } from './index';
import { Dispatch, AnyAction } from 'redux';
import { count } from 'console';
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
    updated: string,
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
    accounts: Account[],
    timePassedSinceUpdate: number,
    counting: boolean
}

const initialState: AccountState = {
    accounts: [],
    timePassedSinceUpdate: 0,
    counting: false
};

export const addAccount = (account:Account[]) => {
    return typedAction('teams/ADD_ACCOUNT', account);
};

export const startCounter = () => {
    return typedAction('teams/START_COUNTER')
}

export const clockTime = () => {
    return typedAction('teams/CLOCK_TIME')
}

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
// export const toggleCountera = () => {
//     return (dispatch: Dispatch<AnyAction>) => {
//         dispatch(toggleCounterAction())
//     }
// }

export const clockElapsedTime = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch(
            clockTime()
        )
    }
}
interface Action {
    type: 'teams/CLOCK_TIME';
}
interface StartCounter {
    type: 'teams/START_COUNTER'
}
type ActionType = ReturnType<typeof addAccount> | Action | StartCounter


export function teamReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'teams/ADD_ACCOUNT':
            return {
                ...state,
                accounts: [...state.accounts, ...action.payload],
            };
        case 'teams/CLOCK_TIME':
            return {
                ...state,
                timePassedSinceUpdate: state.timePassedSinceUpdate + 1
            }
        case 'teams/START_COUNTER':
            return {
                ...state,
                counting: true            }    
        default:
            return state;
    }
}