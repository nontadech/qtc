import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { Router, browserHistory } from 'react-router'
//import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'

//import 'bootstrap/dist/css/bootstrap.min.css';
import thunk from 'redux-thunk'
import reducers from './reducers'


const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={routes}
        />
    </Provider>
    ,document.getElementById('root')
);
registerServiceWorker();
