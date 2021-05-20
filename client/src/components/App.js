import React, {useEffect,Suspense, lazy} from "react";
import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./app.css";
import Registration from "./registration/Registration";
import Login from "./registration/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import SelectGame from "./game/SelectGame";
import Game from "./game/Game.jsx";
import History from "./history/History";
import Range from "./range/Range";
import {actionRefreshRange} from "../actions/range";
import Settings from "./settings/Settings";
import {actionRefreshHistory} from "../actions/history";
import Home from "./home/Home";
import ResetPassword from "./resetPassword/resetPassword";


function App() {
    const isAuth = useSelector(state=>state.user.isAuth)
    const isGame = useSelector(state=>state.game.startGame)

    const dispatch = useDispatch();

    actionRefreshHistory();
    actionRefreshRange();

    useEffect(()=>{
        dispatch(auth());
    },[])

    let step = useSelector(state=>state.user.step);

    return (
        <BrowserRouter>
            {!isGame ?<div className={"app"}>
                <Navbar />
                </div>
            : ''}
            {!isAuth ?
                <Switch>
                    <Route path={"/registration"} component={Registration}/>
                    <Route path={"/reset"}  component={ResetPassword}/>

                    <Route exact path={['/login', '/']} component={Login}/>
                </Switch>
                :
                <div className={'wrapp'}>
                    <Switch>
                        <Route exact path={["/", "/login", "/registrations"]} component={Home}/>
                        <Route path={'/preview'} component={SelectGame}/>
                        <Route exact path={"/game/:name"} component={Game}/>
                        <Route exact path={"/history"} component={History}/>
                        <Route exact path={"/range"} component={Range}/>
                        <Route exact path={"/settings"} component={Settings}/>
                    </Switch>
                </div>

            }

        </BrowserRouter>
);
}

export default App;
