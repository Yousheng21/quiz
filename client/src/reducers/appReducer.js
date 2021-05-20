import {loadFromLocalStorage} from "../store";

const SET_HISTORY="SET_HISTORY";
const SET_RANGE="SET_RANGE";
const SET_CURRENTLY_RANGE="SET_CURRENTLY_RANGE";
const REFRESH_HISTORY="REFRESH_HISTORY";
const REFRESH_RANGE="REFRESH_RANGE";

const defaultState = {
    history: [],
    range: {},
    currentlyRange: [],
    currentlyResult:{
        number:0,
        item:{}
    },
    amount:{},
    top:{}
}

export default function appReducer(state=defaultState,action) {
    switch (action.type) {
        case SET_HISTORY:
            return {
                ...state,
                history: action.history,
                amount: action.amount
            }
        case SET_RANGE:
            return {
                ...state,
                range: action.range,
                currentlyRange: action.range['history'],
                top:action.top
            }
        case SET_CURRENTLY_RANGE:
            return {
                ...state,
                currentlyRange: state.range[action.payload]
            }
        case REFRESH_HISTORY:
            let history = loadFromLocalStorage('history');
            let amount = loadFromLocalStorage('amount');
            return {
                ...state,
                history: history,
                amount: amount
            }
        case REFRESH_RANGE:
            let range = loadFromLocalStorage('range');
            return {
                ...state,
                range: range,
                currentlyRange: range.history,
                top:loadFromLocalStorage('top'),
                currentlyResult: loadFromLocalStorage('currentResult')
            }

        default:
            return state;
    }
}

export const setHistory = (history,amount) =>({type:SET_HISTORY,history:history,amount:amount})
export const setRange = (range,top) =>({type:SET_RANGE,range:range,top:top})
export const setCurrentlyRange = (kind) =>({type:SET_CURRENTLY_RANGE,payload:kind})
export const refreshHistory = () =>({type:REFRESH_HISTORY})
export const refreshRange = () =>({type:REFRESH_RANGE})
