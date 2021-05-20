const SET_USER="SET_USER";
const LOGOUT = "LOGOUT";
const SET_STEP = "SET_STEP";

const defaultState = {
    currentUser: {},
    isAuth: false,
    step: '0'
}

export default function userReducer(state=defaultState,action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_STEP:
            return {
                ...state,
                step:action.step
            }
        default:
            return state;
    }
}

//action creators
export const setUser = (user) =>({type:SET_USER,payload:user})
export const logout = () =>({type:LOGOUT})
export const setStep = (step) =>({type:SET_STEP,step:step})