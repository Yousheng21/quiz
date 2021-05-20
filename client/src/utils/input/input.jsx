import React from 'react';
import "./input.css"
const Input = (props) => {
    return (
        props.type === 'password'?
            <div className={'password'}>
                <input onChange={(event)=> props.setValue(event)}
                       onBlur={event => props.onBlur(event)}
                       value={props.value}
                       type={props.type}
                       placeholder={props.placeholder}
                       id={props.id}/>

                <a href="#" className={'password-control'}
                   onClick={(e)=>{
                       return show_hide_password(e.target,props.id);
                   }}
                />
            </div>


            :
        <input onChange={(event)=> props.setValue(event)}
               onBlur={event => props.onBlur(event)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
);
};

function show_hide_password(target,id){
    var input = document.getElementById(id);
    if (input.getAttribute('type') === 'password') {
        target.classList.add('show');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('show');
        input.setAttribute('type', 'password');
    }
    return false;
}


export default Input;