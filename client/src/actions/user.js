import React from "react"

import axios from "axios";
import {setStep, setUser} from "../reducers/userReducer";
import {startRange} from "./range";
import {startHistory} from "./history";
import saveToLocalStorage, {loadFromLocalStorage, store} from "../store";
import Swal from 'sweetalert2';
import {API_URL} from "../config";
import emailjs from 'emailjs-com';
const bcrypt = require("../../node_modules/bcryptjs")


export const registration = async (email,password) =>{
    try {

        const response = await axios.post(`${API_URL}/auth/registration`,{
            email,
            password
        })
        await showMessage('success', response.data.message);
        sendEmailRegistration(response.data.user.email);
        setTimeout(()=>store.dispatch(login(email,password)),2000)
    } catch (e) {
        if (e.response) return showMessage('error', e.response.data.message);
        // alert(e.response.data.errors.errors[0].msg);

    }
}


export const login = (email,password) =>{
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`,{
                email,
                password
            })
            dispatch(setUser(response.data.user));
            localStorage.setItem('token',response.data.token);//локальное хранилище
            dispatch(startHistory(),startRange());
            // console.log(response.data);
        } catch (e) {
            if (e.response) return showMessage('error', e.response.data.message);

        }
    }

}

export const setLocalStep = ()=>{
    store.dispatch(setStep('1'));
    saveToLocalStorage('step','1');
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response)
            localStorage.removeItem('token')
        }
    }
}

export const reset = async (email)=> {
        try {
            const response = await axios.post(`${API_URL}/auth/reset`,{
                email
            })

            store.dispatch(setStep('2'));
            sendEmailResetPassword(email,response.data.code,response.data.num);
            saveToLocalStorage('step','2');
            saveToLocalStorage('emailStep',email);
            // console.log(response.data);
        } catch (e) {
            if (e.response) return showMessage('error', e.response.data.message);

        }
}

export const setNewPassword = async (email,password)=>{
    try {
        if (email === '') email = loadFromLocalStorage('emailStep');
        await axios.post(`${API_URL}/auth/edit`,{
            email,
            password
        })

        await showMessage('success','password is updated');
        return login(email,password);

    } catch (e) {
        if (e.response) return showMessage('error', e.response.data.message);
    }
}

export const confirmCode = async (code)=>{
    let codeReal = loadFromLocalStorage('code');
    let codeRight = await bcrypt.compareSync(code,codeReal);
    if (!codeRight){
        return showMessage('error','code is wrong');
    } else{
        store.dispatch(setStep('3'));
        saveToLocalStorage('step','3');
    }
}

const sendEmailRegistration = (email) =>{
    emailjs.send('yousheng', 'template_nmf3fsu', {name: email},'user_7uXSBfpEfj28oiKCTGMxh')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}



const sendEmailResetPassword = (email,code,num) =>{
    console.log(num)
    // emailjs.send('yousheng', 'template_6hc9gf2', {name: email,code:num},'user_7uXSBfpEfj28oiKCTGMxh')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });
    localStorage.setItem('code', code);
}

const showMessage = async (type,text)=> {
    await Swal.fire({
        position: 'center',
        icon: type,
        title: text,
        showConfirmButton: false,
        timer: 1500
    });
}