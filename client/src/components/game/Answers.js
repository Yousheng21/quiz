import React from 'react';

const Answers = (props) => {

    return (
        <li className="answerOption">
            <input
                type="checkbox"
                className="radioCustomButton"
                name="radioGroup[]"
                // checked={true}
                id={props.type}
                value={props.type}
                // disabled={props.answer}
                /*если нажали возвращаемся в app и вызываем функ*/
                // onChange={props.onAnswerSelected}
            />
            <label className="radioCustomLabel" htmlFor={props.type}>
                {props.content}
            </label>
        </li>
    );
};

export default Answers;