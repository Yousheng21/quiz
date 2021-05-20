import React from "react";
import saveToLocalStorage, {loadFromLocalStorage, store} from "../store";
import axios from "axios";
import {refreshRange, setCurrentlyResult, setRange} from "../reducers/appReducer";
import {API_URL} from "../config";


export const  startRange = async () =>{
    try {
        const response =  await axios.post(`${API_URL}/history/range`,{
        });

        let range = printRange(response.data.response);
        store.dispatch(setRange(range,top(range)));
        saveToLocalStorage('range',range);
        saveToLocalStorage('top',top(range));

    } catch (e) {
        console.log(e.response);
    }

}

function printRange(history) {
    history = sort(history);
    let exception = {
        history:[],
        biology:[],
        geography:[],
        mixed:[]
    }
    let userId = {
        history:'1',
        biology:'1',
        geography:'1',
        mixed:'1'
    }
    let arr = {
        history:[],
        biology:[],
        geography:[],
        mixed:[]
    };
    history.forEach((item)=>{
        if (userId[item.kind] !== item.userId && !exception[item.kind].includes(item.userId)){
            arr[item.kind].push(item)
        }
        exception[item.kind].push(item.userId);
        userId[item.kind] = item.userId;

    });
    return {
        history: arr.history,
        biology: arr.biology,
        geography: arr.geography,
        mixed: arr.mixed
    };
}



function sort(arr) {
    return arr.sort((a,b)=>{
        return b.result - a.result;
    })
}


function top(range) {
    const userId = store.getState().user.currentUser.id;

    let top =  {
        history:0,
        biology: 0,
        geography: 0,
        mixed: 0
    }

    for (var key in top) {
        writeTop(key);
    }
    // Object.keys(top).map((item)=>{
    //     console.log(item)
    //
    // })

    function writeTop(kind){
        range[kind].forEach((item,number)=>{
            if (item.userId === userId){
                return top[kind] = number+1
            }
        })
    }

    return top;


}

export const actionRefreshRange = ()=>{
    const range = store.getState().app.range;
    const localRange = loadFromLocalStorage('range');
    if (localRange){
        if (Object.keys(range).length === 0 && Object.keys(localRange).length !== 0) store.dispatch(refreshRange());
    }
}
