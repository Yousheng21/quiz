import React from "react";
import saveToLocalStorage, {loadFromLocalStorage, store} from "../store";
import axios from "axios";
import {refreshHistory, setHistory} from "../reducers/appReducer";
import {API_URL} from "../config";


export const  startHistory = async () =>{
        try {

            const id = store.getState().user.currentUser.id;
            const response = await axios.post(`${API_URL}/history/response`,{
                id
            });

            let amount = counterQuizzes(response.data.response,id);
            store.dispatch(setHistory(response.data.response, amount));

            saveToLocalStorage('history',response.data.response);
            saveToLocalStorage('amount',amount);

            // console.log(response.data.response)

        } catch (e) {
            console.log(e.response);
        }


}

export const counterQuizzes = (history,id)=>{
    let amount = {
        history:{
            value:0,
            avg:0
        },
        biology: {
            value:0,
            avg:0

        },
        geography: {
            value:0,
            avg:0

        },
        mixed:{
            value:0,
            avg:0

        }
    };

    history.forEach((item)=>{
        if (item.userId===id){
            switch (item.kind) {
                case 'history':{
                    amount.history.value++;
                    amount.history.avg += item.result;
                    break;
                }
                case 'biology':{
                    amount.biology.value++;
                    amount.biology.avg += item.result;
                    break;
                }
                case 'geography':{
                    amount.geography.value++;
                    amount.geography.avg += item.result;
                    break;
                }
                case 'mixed':{
                    amount.mixed.value++;
                    amount.mixed.avg += item.result;
                    break;
                }
            }
        }
    })
    Object.keys(amount).map((item)=>{
        amount[item].avg = Math.floor(amount[item].avg / amount[item].value);
    })
    return amount;

}

export const actionRefreshHistory = ()=>{
    const history = store.getState().app.history;
    const localHistory = loadFromLocalStorage('history');
    if (localHistory){
        if (history.length === 0 && localHistory.length!==0) store.dispatch(refreshHistory());
    }
}