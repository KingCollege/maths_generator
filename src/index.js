import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createGlobalStyle } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/saga/saga';

const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }

      .hide-scroll::-webkit-scrollbar {
          display: none;
      }

      .hide-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none; 
      }

      .select-all {
        -webkit-touch-callout: all; 
        -webkit-user-select: all; 
        -khtml-user-select: all; 
        -moz-user-select: all;
        -ms-user-select: all; 
        user-select: all; 
      }

      h1, p, button {
        -webkit-touch-callout: none; 
        -webkit-user-select: none; 
        -khtml-user-select: none; 
        -moz-user-select: none;
        -ms-user-select: none; 
        user-select: none; 
      }

      button {
        background: transparent;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
        
        &:hover {
            background: transparent;
            box-shadow: 0px 0px 0px transparent;
            border: 0px solid transparent;
            text-shadow: 0px 0px 0px transparent;
        }

        &:active {
            outline: none;
            border: none;
        }

        &:focus {
            outline: 0;
        }
      }

`;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle />
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
