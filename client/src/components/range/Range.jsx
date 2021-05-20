import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadFromLocalStorage} from "../../store";
import {setCurrentlyRange} from "../../reducers/appReducer";
import {NavLink} from "react-router-dom";
import "./range.css";

const Range = () => {

    const dispatch = useDispatch();
    let range = useSelector(state=>state.app.currentlyRange);
    const localHistory = loadFromLocalStorage('history');
    return (
        <div>
            {localHistory.length === 0 ?
                <div>
                   Вы еще не играли в этот вид. Поиграть можно  <NavLink to={"/preview"}> здесь </NavLink>
                </div>
                :

                /*<div  className="d-flex justify-content-center">*/
                /*    <div id={"preloader"}  className="spinner-border" role="status">*/
                /*        <span className="sr-only">Loading...</span>*/
                /*    </div>*/
                /*</div>*/
                <div className={'top'}>
                    <nav className="navbar navbar-light bg-light mb-5">
                        <div className="container-fluid justify-content-center">
                            <button
                                className={"btn btn-outline-success"}
                                onClick={() => dispatch(setCurrentlyRange('history'))}
                                type="button">История
                            </button>
                            <button className="btn btn-outline-success"
                                    onClick={() => dispatch(setCurrentlyRange('geography'))}
                                    type="button">География
                            </button>
                            <button className="btn btn-outline-success"
                                    onClick={() => dispatch(setCurrentlyRange('biology'))}
                                    type="button">Биология
                            </button>
                            <button className="btn btn-outline-success"
                                    onClick={() => dispatch(setCurrentlyRange('mixed'))}
                                    type="button">Смешанная
                            </button>
                        </div>
                    </nav>

                    <div>
                        {range.length === 0 ?
                            <div>Никто пока еще не играл в этот вид викторины</div>
                            :
                            <table>
                                <thead className={"text-center border border-secondary"}>
                                <th>№</th>
                                <th>Имя пользователя</th>
                                <th>% правильных ответов</th>
                                <th>Дата</th>
                                </thead>

                                <tbody>
                                {
                                    range.map((item, index) => {
                                        return (
                                            <tr key={index} className={"text-center border border-secondary"}>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.result}%</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Range;