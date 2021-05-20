import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CSSTransition} from "react-transition-group";
import {giveAnswers, next, refresh, setAnswer, startGame} from "../../actions/game";
import Answers from "./Answers";
import Result from "./Result";
import "./game.css";
import Modal from "../../utils/Modal/Modal";
import {resetGame} from "../../reducers/gameReducer";
import {NavLink} from "react-router-dom";




// window.onbeforeunload = function (event) {
//   return false;
// }


const Game = () => {
    const dispatch = useDispatch();
    let flagStart = useSelector(state=>state.game.startGame);
    const [loaderVisible,setLoaderVisible] = useState(false);
    const [textError,setTextError] = useState('')
    const [modal,setModal] = useState(false);
    setTimeout(()=>setLoaderVisible(true),);
    refresh();

    let number = useSelector(state=>state.game.currentQuestionCount);
    let options = useSelector(state=>state.game.currentOptions);
    let flagEnd = useSelector(state=>state.game.endGame);
    let length = useSelector(state=>state.game.questionsLength);
    let rightAnswers = useSelector(state=>state.game.rightAnswersCount);
    let kind = useSelector(state=>state.game.currentKind);
    let answers = options.answers;

    useEffect(()=>{
        startGame();
        answers = shuffleArray(options.answers);
    },[kind])



    function checkForm() {
        let answers = giveAnswers();
        if (answers.length === 0){
            setTextError('Answer is empty');
            return false;
        } else {
            setTextError('');
            return true;
        }
    }
    function shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // Пока остаются элементы, чтобы перемешать …
        while (0 !== currentIndex) {
            // Выберите оставшийся элемент …
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // И поменяйте местами с текущим элементом.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }


    return (
        <div className={'m-3'}>
            <h2 className={'text-center'}>{kind}</h2>
            <div className={'d-flex justify-content-end'}>
                {flagStart ?<button onClick={()=>setModal(true)} className={'btn btn-primary mr-5 mt-2'}>Exit</button>:""}
            </div>
            <Modal active={modal} setActive={setModal}>
                <p>You are sure that want to leave from this quiz, everything data will be lost!</p>
                <div className={'d-flex justify-content-around'}>
                    <NavLink to={'/'}>
                        <button onClick={()=>{
                            setModal(false);
                            dispatch(resetGame());
                        }}>OK</button>
                    </NavLink>

                    <button onClick={()=>setModal(false)}>Cancel</button>
                </div>
            </Modal>
            {!flagEnd?
                    <CSSTransition
                        key={number}
                        in={loaderVisible}
                        timeout={500}
                        classNames={"answers"}
                        // mountOnEnter
                        // unmountOnExit
                    >
                        <div className="answers" key={number}>
                            <h3>{number + 1} Question of {length}</h3>
                            <h2>{options.question}</h2>
                            <ul className="answerOptions">
                                {/*Для каждого варианта ответа вызываем функцию*/}
                                {answers.map((item, index) => {
                                    return <Answers key={index} type={item.type} content={item.content}/>
                                })}
                            </ul>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <button className={'btn btn-secondary mr-5 mt-2'} type={"button"} id={'check'} onClick={()=>{
                                    if (checkForm()) setAnswer();
                                }}>Check</button>

                                {textError}

                                <button className={'btn btn-secondary mr-5 mt-2'} type={"button"} style={{display: 'none'}} id={'next'} onClick={() => {
                                    next(number+1, length);
                                    if (length - number !== 1){
                                        setLoaderVisible(!loaderVisible);
                                    }
                                }}>{length - number === 1 ? "Finish" : "Next"}</button>
                            </div>
                        </div>
                    </CSSTransition>
                    :
                    <Result number={number} answers={rightAnswers} length={length}/>
            }
        </div>
    );
};

export default Game;




