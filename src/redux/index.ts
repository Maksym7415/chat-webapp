import { createStore, applyMiddleware, compose } from 'redux';
import * as reduxModule from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './reducer';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const configureStore = () => {
  const store = createStore(
    rootReducer,
    enhancer,
  );
//   sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore();

export default store;

