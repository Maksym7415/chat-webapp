import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    loginReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
