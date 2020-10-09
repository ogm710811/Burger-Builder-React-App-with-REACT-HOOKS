import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from "redux-saga";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./store/reducers";
import * as sagaEffects from "./store/sagas";

const rootReducer = combineReducers({
  burgerBuilderReducer: reducers.burgerBuilderReducer,
  orderReducer: reducers.orderReducer,
  contactDataReducer: reducers.contactDataReducer,
  authenticationReducer: reducers.authenticationReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// IMPORTANT !!
// Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(sagaEffects.watchAuthEffect);
sagaMiddleware.run(sagaEffects.watchBurgerBuilderEffect);
sagaMiddleware.run(sagaEffects.watchContactDataEffect);
sagaMiddleware.run(sagaEffects.watchOrdersEffect);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
