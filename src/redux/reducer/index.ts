import { combineReducers } from 'redux';
import authReducer from '../pages/authorization/reducer';
import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
  authReducer,
  formReducer
});

export type RootState = ReturnType<typeof rootReducer>
