import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../authorization/reducer';
import userConversationReducer from '../conversations/reducer';
import userReducer from '../user/reducer/userReducer';
import CommonReducer from '../common/commonReducer';

export const rootReducer = combineReducers({
  authReducer,
  userConversationReducer,
  userReducer,
  CommonReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
