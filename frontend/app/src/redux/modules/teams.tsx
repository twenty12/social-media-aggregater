import { typedAction } from './index';
import { Dispatch, AnyAction, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

import {sailorData, boatData} from "./mock_data"

export type Sailor = {
    id: number,
    name: string,
    gender: string
    age: number,
    boatId: number
}


export type Boat = {
    id: number,
    name: string,
    positon: number,
    flag: string
}

export type TeamState = {
    sailors: Sailor[],
    boats: Boat[]
};

const initialState: TeamState = {
    boats: [],
    sailors: []
};

export const addSailor = (sailor:Sailor[]) => {
    return typedAction('teams/ADD_SAILOR', sailor);
};

export const addBoat = (boat:Boat[]) => {
    return typedAction('teams/ADD_BOAT', boat);
};

export const loadBoats = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        setTimeout(() => {
            dispatch(
                addBoat(boatData['boats'])
            );
        }, 1000);
    };
};

export const loadSailors = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        setTimeout(() => {
            dispatch(
                addSailor(sailorData['sailors'])
            );
        }, 1000);
    };
};

type ActionType = ReturnType<typeof addBoat> | ReturnType<typeof addSailor>;



export function teamReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'teams/ADD_SAILOR':
            return {
                ...state,
                sailors: [...state.sailors, ...action.payload],
            };
        case 'teams/ADD_BOAT':
            return {
                ...state,
                boats: [...state.boats, ...action.payload],
            };
        default:
            return state;
    }
}