import React from "react";
import {endGame, nextGame, refreshGame, setKind} from "../reducers/gameReducer";
import saveToLocalStorage, {store} from "../store";
import axios from "axios";
import {startHistory} from "./history";
import {startRange} from "./range";
import {API_URL} from "../config";
const questions = require('../assets/questions.json');


export const startGame = () =>{
    let input = document.querySelectorAll('input[type=checkbox]');
    input.forEach((item)=>{
        item.className = 'radioCustomButton';
        item.checked = false;
    })
    document.querySelectorAll("label.radioCustomLabel1").forEach((item)=>{
        item.className = 'radioCustomLabel';
    });


}

export const checkKind = (kind,index)=>{
    console.log(kind,index);
   if (index===3){
       let arr = [], sort = 0, quest = 0;
       let repeat = new Map();
       while (arr.length < 20){
           sort = Math.floor(Math.random() * 3);
           quest = Math.floor(Math.random() * 20);

           if (repeat.get(sort) !== quest) {
               arr.push(questions[sort][quest]);
               repeat.set(sort,quest);
           }
       }
       return store.dispatch(setKind(arr,kind));
   } else {
       return store.dispatch(setKind(questions[index],kind));
   }
}

export const refresh = ()=>{
    let kind = store.getState().game.currentKind;
    if (!kind) store.dispatch(refreshGame());
}

export const next = (current,length) =>{

    var answer = checkAnswer();
    if (current === length) {
        setTimeout(() => end(answer,length),500 );

    } else  {
        clear();
        store.dispatch(nextGame(answer));
    }
    saveToLocalStorage('game',store.getState().game);
}


const end = async (answer,length) =>{
        try {
            const right = answer ? store.getState().game.rightAnswersCount+1 : store.getState().game.rightAnswersCount;
            const kind = store.getState().game.currentKind;
            const email = store.getState().user.currentUser.email;
            const result = Math.floor(right/length *100);



            let date = new Date();
            date.setMonth(date.getMonth()+1);
            let day = changeDate(date.getDate());
            let month = changeDate(date.getMonth());
            let hours = changeDate(date.getHours());
            let minutes = changeDate(date.getMinutes());

            date = day +"."+ month +"."+date.getFullYear() +" "+hours+":"+minutes;

            const response = await axios.post(`${API_URL}/history/request`,{
                email,
                result,
                kind,
                right,
                length,
                date
            });
            await startHistory();
            await startRange();
            let current = currentResult(kind,response.data.id)
            store.dispatch(endGame(answer, current));
            saveToLocalStorage('game',store.getState().game);
            console.log(response.data);
        } catch (e) {

            console.log(e.response)
        }

}


export const changeDate = (variable)=>{
    return variable <10 ? "0"+variable: variable;
}


export const currentResult = (kind,id)=> {
    const range = store.getState().app.range[kind];
    let current = {
        number:0,
        item:{}
    }
    range.forEach((item,number)=>{
        if (item._id === id){
            current.number = number+1;
            current.item = item;
        }
    })
    return current;
}


export const giveAnswers = () =>{
    var selectedCheckBoxes = document.querySelectorAll('input:checked');
    return Array.from(selectedCheckBoxes).map(cb => cb.value);
}

export const setAnswer = ()=>{
    let flag = checkAnswer();
    let answer = giveAnswers();
    let number = store.getState().game.currentQuestionCount;

    answer.map((item,index)=>{
        let checkbox = document.getElementById(item);
        checkbox.classList.replace('radioCustomButton',flag?'radioCustomButton1':'radioCustomButton2');
    });
    if (!flag) setTimeout(()=>selectRightAnswer(),500);

    document.querySelectorAll('input[type=checkbox]').forEach((item)=>{
        item.disabled = true;
    })

    document.getElementById('next').style.display = 'block';
    document.getElementById('check').style.display = 'none';

}

const selectRightAnswer = ()=>{
    let input = document.querySelectorAll('input[type=checkbox]'),
        rightAnswer = store.getState().game.rightAnswer;
    input.forEach((item)=>{
        item.className = 'radioCustomButton';
        item.checked = false;
    });
    rightAnswer.map((item)=>{
        document.querySelector("label[for="+item+"]").className = 'radioCustomLabel1';
    });
}


const checkAnswer = () =>{
    let answer = giveAnswers();
    let count = 0, flag = false,
        rightAnswer = store.getState().game.rightAnswer;
    answer.forEach((item)=>{
        if(rightAnswer.includes(item))
            count++;
    });
    if(rightAnswer.length === count && answer.length === rightAnswer.length){
        flag = true;
    }
    return flag;
}

function clear(){
    document.getElementById('next').style.display = 'none';
    document.getElementById('check').style.display = 'block';
    document.querySelectorAll('input[type=checkbox]').forEach((item)=>{
        item.disabled = false;
    });
}
