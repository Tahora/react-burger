import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./components/app/app";
import {  createStore, applyMiddleware } from 'redux';
import { rootReducer,initState } from './services/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';



const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(rootReducer, initState,  composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
));

const root = createRoot(document.querySelector('#root'));
root.render(
    <Provider store={store}>
    <App/>
    </Provider>);

