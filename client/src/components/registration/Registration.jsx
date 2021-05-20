import React, {useState} from 'react';
import "./registration.css";
import Input from "../../utils/input/input";
import {registration} from "../../actions/user";
import {useInput} from "../../utils/validator/validator";
import {NavLink} from "react-router-dom";


const Registration = () => {
    const email= useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength:{value:3,text:"минимальная длина 3"},isEmail: {value:true,text:'Неправильный email'}})
    const password = useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength: {value:3,text:'минимальная длина 3'},maxLength: {value:8,text:'максимальная длина 8'}})
    return (
        <div className={'registration'}>
            <div className="registration_header">Registration</div>
            {email.isDirty && email.printError(['isEmpty','minLengthError','emailError'])}

            <Input setValue={email.onChange} onBlur={email.onBlur} value={email.value}  type={"text"} placeholder={"Введите email..."}/>

            {password.isDirty && password.printError(['isEmpty','minLengthError','maxLengthError'])}

            <Input id={'password-login'} setValue={password.onChange} onBlur={password.onBlur} value={password.value}  type={"password"} placeholder={"Введите пароль..."}/>
            {(!email.inputValid.value || !password.inputValid.value) && <div>{email.inputValid.text || password.inputValid.text}</div>}

                <button className="registration_btn"
                        disabled={!email.inputValid.value || !password.inputValid.value}
                        onClick={()=> registration(email.value,password.value)}
                >
                    Sign up
                </button>

        </div>
    );
};

export default Registration;