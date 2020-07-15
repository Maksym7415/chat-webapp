import { combineReducers } from 'redux';
import authReducer from '../pages/authorization/reducer';

export const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>
