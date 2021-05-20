import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
  document.getElementById('root')
);

