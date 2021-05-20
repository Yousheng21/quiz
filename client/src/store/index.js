import {applyMiddleware, createStore} from "redux";
import { persistStore } from "redux-persist";
import {rootReducer} from "../reducers/index";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export default function saveToLocalStorage(name,state){
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem(name,serializedState)
    } catch (e) {
        console.log(e)
    }
}

export  function loadFromLocalStorage(name){
    try {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) return undefined;
        else if (name === 'code') return serializedState;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e)
        return undefined;
    }
}

export const store =  createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

