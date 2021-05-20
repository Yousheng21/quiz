import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useInput} from "../../utils/validator/validator";
import Input from "../../utils/input/input";
import {edit} from "../../actions/settings";
import {loadFromLocalStorage} from "../../store";
import "./settings.css";

const Settings = () => {
    const email = useSelector(state=>state.user.currentUser.email)
    const top = useSelector(state=>state.app.top)
    const amount = useSelector(state=>state.app.amount)
    const localHistory = loadFromLocalStorage('history');
    const oldPassword = useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength: {value:3,text:'минимальная длина - 3'},maxLength: {value:8,text:'максимальная длина - 8'}})
    const newPassword = useInput('',{isEmpty: {value:true,text:'Поле пустое'},minLength: {value:3,text:'минимальная длина - 3'},maxLength: {value:8,text:'максимальная длина - 8'}})
    const [form,setForm] = useState(false);

    return (
        <div>
                <div>
                    <img src="" alt=""/>

                    {

                        localHistory.length === 0 ?
                            <div>
                                Вы еще не играли в этот вид. Поиграть можно  <NavLink to={"/preview"}> здесь </NavLink>
                            </div>
                            :
                            <div className={'d-flex justify-content-around'}>
                                <div className={'d-flex flex-column'}>
                                    <h3>История викторин</h3>
                                    <div className={'d-flex'}>
                                        {Object.keys(amount).map((item) => {
                                            return <div className={'d-flex flex-column p-2'}>
                                                <span>{item}:</span>
                                                <span className={'text-center'}> {amount[item].value}</span>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className={'d-flex flex-column'}>
                                    <h3>Место в рейтинге</h3>
                                    <div className={'d-flex'}>
                                        {Object.keys(top).map((item) => {
                                            return <div className={'d-flex flex-column p-2'}>
                                                <span>{item}:</span> <span className={'text-center'}> {top[item] === 0? '-':top[item]}</span>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className={'d-flex flex-column'}>
                                    <h3>Средний % правильных ответов</h3>
                                    <div className={'d-flex'}>
                                        {Object.keys(amount).map((item) => {
                                            return <div className={'d-flex flex-column p-2'}>
                                                <span>{item}:</span>
                                                <span className={'text-center'}> {isNaN(amount[item].avg) || !amount[item].avg? '-':amount[item].avg+" %" }</span>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                    }
                    <div className={'m-3'}>
                        Email: {email}
                    </div>
                    <button className={'btn btn-secondary ml-3'} onClick={() => setForm(!form)}>Изменить профиль</button>
                    {form ?
                        <div className={'edit'}>
                            {oldPassword.isDirty && oldPassword.printError(['isEmpty', 'minLengthError', 'maxLengthError'])}

                            <Input id={'old-password'} setValue={oldPassword.onChange} onBlur={oldPassword.onBlur} value={oldPassword.value}
                                   type={"password"} placeholder={"Введите старый пароль..."}/>

                            {newPassword.isDirty && newPassword.printError(['isEmpty', 'minLengthError', 'maxLengthError'])}

                            <Input id={'new-password'} setValue={newPassword.onChange} onBlur={newPassword.onBlur} value={newPassword.value}
                                   type={"password"} placeholder={"Введите новый пароль..."}/>
                            {(oldPassword.isDirty || newPassword.isDirty) && (!newPassword.inputValid.value || !oldPassword.inputValid.value) && <div>{newPassword.inputValid.text || oldPassword.inputValid.text}</div>}

                            <button className={'registration_btn'}
                                    disabled={!oldPassword.inputValid.value || !newPassword.inputValid.value}
                                    onClick={
                                        () => edit(email, oldPassword.value, newPassword.value)
                                    }>Сохранить
                            </button>
                        </div> : ''
                    }

                </div>

        </div>
    );
};

export default Settings;