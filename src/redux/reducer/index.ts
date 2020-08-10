import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../authorization/reducer';
import userConversationReducer from '../conversations/reducer';
import userReducer from '../user/reducer/userReducer';

export const rootReducer = combineReducers({
  authReducer,
  userConversationReducer,
  userReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
