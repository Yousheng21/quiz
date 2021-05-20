import {combineReducers} from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./userReducer";
import gameReducer from "./gameReducer";
import appReducer from "./appReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["game"]
};

export const rootReducer = combineReducers({
    user: userReducer,
    app:appReducer,
    game: gameReducer
})

export default persistReducer(persistConfig,rootReducer);

// export const store =  createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))