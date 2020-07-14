import { combineReducers } from 'redux';
import authReducer from '../authorization/reducer';

export const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>
