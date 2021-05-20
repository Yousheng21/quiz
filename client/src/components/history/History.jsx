import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {actionRefreshHistory, startHistory} from "../../actions/history";
import {loadFromLocalStorage, store} from "../../store";
import {NavLink} from "react-router-dom";
import "./history.css";

const History = () => {

    let history = useSelector(state=>state.app.history);
    // history.reverse();
    // console.log(history);
    const localHistory = loadFromLocalStorage('history');

    // useEffect(()=>{
    //     store.dispatch(()=>{startHistory()});
    // },[])

    return (
        <div className={'history'}>
            {localHistory.length === 0 ?
                <div>
                    You don't play in quiz yet. You can take a part now  <NavLink to={"/preview"}> here </NavLink>
                </div>
                :
                <div>
                    <table>
                        <thead className={"text-center border border-secondary"}>
                        <th>№</th>
                        <th>Вид</th>
                        <th>Правильные ответы</th>
                        <th>Всего вопросов</th>
                        <th>% правильных ответов</th>
                        <th>Дата</th>
                        </thead>
                        <tbody>
                        {
                            history.map((item, index) => {
                                return (
                                    <tr key={index} className={"text-center border border-secondary"}>
                                        <td>{index + 1}</td>
                                        <td>{item.kind}</td>
                                        <td>{item.rightAnswers}</td>
                                        <td>{item.totalAnswers}</td>
                                        <td>{item.result}%</td>
                                        <td>{item.date}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

            }
        </div>
    );
};

export default History;