import React from 'react';
import {useDispatch} from "react-redux";
import {nextGame} from "../../reducers/gameReducer";

const View = (props) => {
    const dispatch = useDispatch();
    return (
        <div>
            <h3>{props.count} Question</h3>
            <h2>{props.options.question}</h2>
            <ul>
                {
                    props.options.answers.map((item,index)=>{
                        return <li key={index}>{item.content}</li>
                    })
                }
            </ul>
            <button type={"button"} onClick={()=>dispatch(nextGame())}>Check</button>
        </div>
    );
};

export default View;