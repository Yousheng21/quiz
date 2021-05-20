import React, {useState} from 'react';
import {CSSTransition} from "react-transition-group";
import "./game.css";
import {useSelector} from "react-redux";
const Result = (props) => {
    const result = useSelector(state=>state.game.currentlyResult)
    const [finishVisible,setFinishVisible] = useState(false);
    setTimeout(()=>setFinishVisible(true),);
    return (
        <div>
            <CSSTransition
                key={props.number+1}
                in={finishVisible}
                timeout={500}
                classNames="answers"
            >
                <div className={"answers"}>
                    <p>
                        You answer is right on {props.answers} questions of {props.length}!
                    </p>
                    {
                        result.number === 0 ?
                            <p>Your result lower then before time</p>
                            :
                            <div>
                                Your result : {result.number} place in top that amount of right is answers : {result.item.result} %
                            </div>
                    }
                </div>

            </CSSTransition>
        </div>
    );
};

export default Result;