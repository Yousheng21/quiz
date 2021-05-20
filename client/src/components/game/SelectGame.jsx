import React from 'react';
import {BrowserRouter as Router, NavLink, Route,Switch} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {setKind} from "../../reducers/gameReducer";
import {CSSTransition} from "react-transition-group";
import saveToLocalStorage, {store} from "../../store";
import './game.css'
import Game from "./Game";
import {checkKind} from "../../actions/game";

const SelectGame = (props) => {
    const dispatch = useDispatch();
    const routes = ['История','Биология','География','Смешанная'];
    // const kind = useSelector(state=>state.game.currentKind)
    // console.log(kind);
    return (
        <div>
            <Route exact path={props.match.path} >
                <p className={'text-center'}>
                    В этом разделе вы можете проверить свои знания в одной из областей.<br/>
                    Для того чтобы поучавствовать в викторине <b>перейдите</b> в интересующий вас раздел и <b>кликните по кнопке "Начать игру"</b>
                </p>
            </Route>
            <ul className="kinds">
                    {routes.map((item) =>  (
                        <li className="nav-item" role="presentation">
                            <NavLink className="nav-link" type="button"
                                     key={item} to={'/preview/'+item} activeClassName={'active'}>
                                {item}
                            </NavLink>
                        </li>

                    ))}
            </ul>
            <div>
                {routes.map((item,index)=>(
                    <Route key={item} exact path={`${props.match.path}/`+item}>
                        {({ match }) => (
                            <CSSTransition
                                in={match != null}
                                timeout={300}
                                classNames="page"
                                unmountOnExit
                            >
                                <div className="page">
                                    <div className={'d-flex flex-column align-items-center'}>
                                        <p>Этот раздел "{item}" сосотоит из 20 вопросов. Нажав кнопку начать игру вы не сможете досрочно ее завершить</p>
                                        <NavLink to={'/game/'+item}>
                                            <button onClick={()=>{
                                                dispatch(()=>checkKind(item,index));
                                                saveToLocalStorage('game',store.getState().game);
                                            }}>Начать игру</button>
                                        </NavLink>
                                    </div>

                                </div>
                            </CSSTransition>
                        )}
                    </Route>
                ))}


            </div>
        </div>

    );
};

export default SelectGame;
