import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../pages/authorization/reducer';
import userConversationHistoryReducer from '../pages/conversations/reducer';

export const rootReducer = combineReducers({
  authReducer,
  userConversationHistoryReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
