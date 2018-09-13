
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware ,compose} from 'redux';
import appReducers from './redux/index';
import { Provider } from 'react-redux';
// import  'babel-polyfill';
import thunk from 'redux-thunk';

import { ConnectedRouter,connectRouter, routerMiddleware } from 'connected-react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

//Your initialization

const history = createBrowserHistory();
history.listen( location =>  {
    console.log(location);
});

const reactRouterMiddleware = routerMiddleware(history); 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWares = [ thunk, reactRouterMiddleware ];
const store = createStore(
    connectRouter(history)(appReducers), 
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // composeWithDevTools(applyMiddleware(...middleWares))
    // applyMiddleware(...middleWares)
    composeEnhancer(
        applyMiddleware(...middleWares)
    ),
);
window.store = store;
// const store = createStore(
//     appReducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(thunk)
// );
ReactDOM.render(
    <Provider store={store}>
     <ConnectedRouter history={history}>
        <App history={history}/>    
     </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
