import jwtDecode from 'jwt-decode';
import { AuthReducerInterface } from './interfaces';
import { AuthActionsInterface } from '../constants/interfaces';
import * as types from '../constants/types';

const initialState: AuthReducerInterface = {
  login: {
    success: {
      status: false,
    },
    error: null,
  },
  signUp: {
    success: {
      email: '',
    },
    error: null,
  },
  verification: {
    success: {
      accessToken: '',
      refreshToken: '',
    },
    error: null,
  },
  tokenPayload: {},

};

const authReducer = (state = initialState, action: AuthActionsInterface): AuthReducerInterface => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        [action.name]: {
          success: action.payload,
          error: null,
        },
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        [action.name]: {
          ...initialState[action.name],
          error: action.payload,
        },

      };
    case types.AUTH_TOKEN:
      let payload: object = {};
      try {
        payload = jwtDecode(action.token);
      } catch (e) {
        console.log(e);
      }
      return {
        ...state,
        tokenPayload: payload,
      };
    default:
      return initialState;
  }
};

export default authReducer;
