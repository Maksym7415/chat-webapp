import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
import rootSaga from './saga/index';
import { actionToken } from './authorization/constants/actionConstants';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const configureStore = () => {
  const store = createStore(
    rootReducer,
    enhancer,
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore();

if (localStorage.accessToken) store.dispatch(actionToken(localStorage.accessToken));

export default store;
