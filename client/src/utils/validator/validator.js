import {useEffect, useState} from "react";


export const useValidation = (value,validations)=>{
    const [isEmpty,setEmpty] = useState({value:true,text:''})
    const [minLengthError,setMinLengthError] = useState({value:false,text:''})
    const [maxLengthError,setMaxLengthError] = useState({value:false,text:''})
    const [emailError,setEmailError] = useState({value:false,text:''})
    const [inputValid,setInputValid] = useState({value:false,text:''})


    useEffect(()=>{
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation].value? setMinLengthError({value: true,text: validations[validation].text}) : setMinLengthError({value: false,text: ''})
                    break;
                case 'isEmpty':
                    value?setEmpty({value: false,text: ''}): setEmpty({value: true,text: validations[validation].text})
                    break;
                case'maxLength':
                    value.length > validations[validation].value? setMaxLengthError({value: true,text: validations[validation].text}) : setMaxLengthError({value: false,text: ''})
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value ).toLowerCase()) ? setEmailError({value: false,text: ''}) : setEmailError({value: true,text: validations[validation].text})
                    break;

            }
        }
    },[value])

    useEffect(()=>{
        if(isEmpty.value || maxLengthError.value || minLengthError.value || emailError.value){
            setInputValid({value: false,text: 'Неправильно введенные данные'})
        } else {
            setInputValid({value: true,text: ''})
        }
    },[isEmpty.value,maxLengthError.value,minLengthError.value,emailError.value])

    return {isEmpty,minLengthError,emailError,maxLengthError,inputValid}
}

export const useInput = (initialState,validations) =>{
    const [value,setValue] = useState(initialState);
    const [isDirty,setDirty] = useState(false)
    const valid = useValidation(value,validations)


    const onChange = (e) =>{
        setValue(e.target.value)
    }

    const onBlur = (e)=>{
        setDirty(true)
    }

    const printError = (validators)=>{
        let flag = false;
        for (let i = 0; i<validators.length;i++){
            for (let j = 0; j<=i;j++){
                if (j<i){
                    flag = !valid[validators[j]].value;
                }
                else {
                    flag = valid[validators[i]].value;
                }
            }
            if (flag) return <span style={{color:'red'}}>{valid[validators[i]].text}</span>;
        }

    }

    return{
        value,onChange,onBlur,isDirty,printError,...valid
    }
}