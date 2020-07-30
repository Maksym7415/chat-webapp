import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../authorization/reducer';
import userConversationReducer from '../conversations/reducer';

export const rootReducer = combineReducers({
  authReducer,
  userConversationReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
