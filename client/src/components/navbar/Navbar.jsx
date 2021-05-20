import React from 'react';
import './navbar.css';
import logo from '../../assets/img/navbar_logo.png'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {start} from "../../actions/range";
import "./navbar.css";
const Navbar = () => {
    const isAuth = useSelector(state=>state.user.isAuth)
    const dispatch = useDispatch()


    return (
        <div className={"navbar"}>
            <NavLink activeClassName={'active1'} to={'/'}>
                <img src={'https://img.icons8.com/wired/64/000000/knowledge-sharing.png'} alt="" width="42" height="36"
                     className="align-text-center"/>
                     Главная
            </NavLink>
            {!isAuth &&
            <div className="navbar_login">
                <NavLink className={'p-3'} to={"/login"}>Войти</NavLink>
                <NavLink to={"/registration"}>Регистрация</NavLink>
            </div> }
            {isAuth &&
            <div className={'d-flex justify-content-between w-75'}>
                <div className={'d-flex justify-content-around w-50'}>
                    <NavLink activeClassName={'active'} to={"/preview"}>Играть</NavLink>
                    <NavLink to={"/history"}>История</NavLink>
                    <NavLink to={"/range"}>Рейтинг</NavLink>
                    <NavLink to={"/settings"}>Профиль</NavLink>
                </div>
                <div>
                    <NavLink to={'/login'}>
                        <button className="navbar_logout" onClick={()=>dispatch(logout())}>Выйти</button>
                    </NavLink>
                </div>
            </div>
            }
        </div>
    );
};

export default Navbar;