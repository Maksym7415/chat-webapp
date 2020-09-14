// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../authorization/reducer';
import userConversationReducer from '../conversations/reducer';
import userReducer from '../user/reducer/userReducer';
import commonReducer from '../common/commonReducer';
import globalSearchReducer from '../search/reducer/searchReducer';

export const rootReducer = combineReducers({
  authReducer,
  userConversationReducer,
  userReducer,
  commonReducer,
  globalSearchReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
