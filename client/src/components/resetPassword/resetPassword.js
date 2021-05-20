import React, {useEffect} from 'react';
import {useInput} from "../../utils/validator/validator";
import Input from "../../utils/input/input";
import {confirmCode, registration, reset, setNewPassword} from "../../actions/user";
import {Link} from "react-router-dom";
import {setStep} from "../../reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {loadFromLocalStorage} from "../../store";

const ResetPassword = () => {

    const email= useInput('',{isEmpty: {value:true,text:'Пустое поле'},minLength:{value:3,text:"минимальная длина - 3"},isEmail: {value:true,text:'неправильный email'}})
    const newPassword = useInput('',{isEmpty: {value:true,text:'Пустое поле'},minLength: {value:3,text:'минимальная длина - 3'},maxLength: {value:8,text:'максимальная длина - 8'}})
    const text = useInput('',{isEmpty: {value:true,text:'Пустое поле'},minLength: {value:4,text:'минимальная длина - 4'},maxLength: {value:4,text:'максимальная длина - 4'}})
    const dispatch = useDispatch();


    let step = useSelector(state=>state.user.step);
    if (step === '0') step = loadFromLocalStorage('step')

    return (
        <div>
            {step === '1'?
                <div className={'registration'}>
                    <div className="registration_header">Шаг 1</div>
                    {email.isDirty && email.printError(['isEmpty','minLengthError','emailError'])}

                    <Input setValue={email.onChange} onBlur={email.onBlur} value={email.value}  type={"text"} placeholder={"Введите email..."}/>

                    <div className={'w-100 d-flex flex-row justify-content-between align-items-center'}>
                        <Link to={'/login'}>
                            <button className={'registration_btn'}>Отмена</button>
                        </Link>

                            <button className="registration_btn"
                                    disabled={!email.inputValid.value}
                                    onClick={()=> reset(email.value)}
                            >
                                Дальше
                            </button>
                    </div>
                </div> :''
            }

            {step === '2' ?
                <div className={'registration'}>
                    <div className="registration_header">Шаг 2</div>
                    {text.isDirty && text.printError(['isEmpty','minLengthError','maxLengthError'])}

                    <Input setValue={text.onChange} onBlur={text.onBlur} value={text.value}  type={"number"} placeholder={"Введите 4-значный код..."}/>

                    <div className={'w-100 d-flex flex-row justify-content-between align-items-center'}>
                        <Link to={'/login'}>
                            <button className={'registration_btn'} onClick={()=>dispatch(setStep('1'))}>Отмена</button>
                        </Link>


                            <button className="registration_btn"
                                    disabled={!text.inputValid.value}
                                    onClick={()=>confirmCode(text.value)}
                            >
                                Дальше
                            </button>

                    </div>
                </div> :''
            }

            {step === '3'?
                <div className={'registration'}>
                    <div className="registration_header">Шаг 3</div>

                    {newPassword.isDirty && newPassword.printError(['isEmpty','minLengthError','maxLengthError'])}

                    <Input id={'password-login'} setValue={newPassword.onChange} onBlur={newPassword.onBlur} value={newPassword.value}  type={"password"} placeholder={"Придумайте новый пароль..."}/>

                    <div className={'w-100 d-flex flex-row justify-content-between align-items-center'}>
                        <Link to={'/login'}>
                            <button className={'registration_btn'}  onClick={()=>dispatch(setStep('2'))}>Отмена</button>
                        </Link>


                            <button className="registration_btn"
                                    disabled={!newPassword.inputValid.value}
                                    onClick={()=>setNewPassword(email.value,newPassword.value)}
                            >
                                Дальше
                            </button>
                    </div>
                </div> :''
            }
        </div>
    );
};

export default ResetPassword;