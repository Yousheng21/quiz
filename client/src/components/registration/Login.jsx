import React, {useEffect, useState} from 'react';
import "./registration.css";
import Input from "../../utils/input/input";
import {useDispatch, useSelector} from "react-redux";
import {login, redirect, setLocalStep} from "../../actions/user";
import {useInput} from "../../utils/validator/validator";
import {Link} from "react-router-dom";

const Login = () => {
    const email= useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength:{value:3,text:"минимальная длина 3"},isEmail: {value:true,text:'Неправильный email'}})
    const password = useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength: {value:3,text:'минимальная длина 3'},maxLength: {value:8,text:'максимальная длина 8'}})
    const dispatch = useDispatch();
    // const history = useHistory();
    // const isAuth = useSelector(state=>state.user.isAuth)

    return (

        <div className={'registration'}>
            <div className="registration_header">Авторизация</div>

            {email.isDirty && email.printError(['isEmpty','minLengthError','emailError'])}

            <Input setValue={email.onChange} onBlur={email.onBlur} value={email.value}  type={"text"} placeholder={"Введите email..."}/>
            {password.isDirty && password.printError(['isEmpty','minLengthError','maxLengthError'])}

            <Input id={'password-login'} setValue={password.onChange} onBlur={password.onBlur} value={password.value}  type={"password"} placeholder={"Введите пароль..."}/>
            {(!email.inputValid.value || !password.inputValid.value) && <div>{email.inputValid.text || password.inputValid.text}</div>}
                <div className={' w-100 d-flex flex-row justify-content-between align-items-center'}>
                    <Link to={'/reset'} onClick={()=>setLocalStep()}>Забыли пароль?</Link>
                    <button disabled={!email.inputValid.value || !password.inputValid.value}
                            className="registration_btn"
                            onClick={()=>{
                                dispatch(login(email.value,password.value));
                            }}
                    >
                        Войти
                    </button>
                </div>



        </div>
    );
};

export default Login;