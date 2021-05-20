import {loadFromLocalStorage} from "../store";

const questions = require('../assets/questions.json');

const SET_KIND="SET_KIND";
const REFRESH_GAME="REFRESH_GAME";
const NEXT_GAME="NEXT_GAME";
const END_GAME="END_GAME";
const RESET_GAME="RESET_GAME";
const SET_CURRENTLY_RESULT="SET_CURRENTLY_RESULT";


const defaultState = {
    currentKind:"",
    currentQuestionCount:0,
    currentOptions:{},
    currentArr:[],
    questionsLength: 0,
    endGame:false,
    startGame:false,
    rightAnswer:[],
    rightAnswersCount:0,
    currentlyResult:{},
}

export default function gameReducer(state=defaultState,action) {
    switch (action.type) {
        case SET_KIND:
            const question = action.payload[0];
            return {
                ...state,
                currentKind: action.name,
                currentOptions: question,
                currentArr: action.payload,
                questionsLength: action.payload.length,
                endGame: false,
                startGame: true,
                rightAnswer: question.answer,
                rightAnswersCount:0
            }
        case REFRESH_GAME:
            let game = loadFromLocalStorage('game');
            return {
                ...state = game,
            }
        case NEXT_GAME:{
            const question = state.currentArr[state.currentQuestionCount+1];
            return {
                ...state,
                currentQuestionCount: state.currentQuestionCount+1,
                currentOptions: question,
                rightAnswer: question.answer,
                rightAnswersCount: action.payload ? state.rightAnswersCount+1 : state.rightAnswersCount

            }

        }
        case SET_CURRENTLY_RESULT:
            return {
                ...state,
                currentlyResult: action.payload
            }
        case END_GAME:
            return {
                ...state,
                currentQuestionCount: 0,
                endGame: true,
                startGame: false,
                rightAnswersCount: action.flag ? state.rightAnswersCount+1 : state.rightAnswersCount,
                currentlyResult: action.result
            }
        case RESET_GAME:
            return defaultState;
        default:
            return state;
    }
}

export const setKind = (arr,kind) =>({type:SET_KIND,payload:arr,name:kind})
export const refreshGame = () =>({type:REFRESH_GAME})
export const nextGame = (answerFlag) => ({type:NEXT_GAME,payload:answerFlag})
export const endGame = (answerFlag,result) => ({type:END_GAME,flag:answerFlag,result:result})
// export const setCurrentlyResult = (item) =>({type:SET_CURRENTLY_RESULT,payload:item})
export const resetGame = () => ({type:RESET_GAME})