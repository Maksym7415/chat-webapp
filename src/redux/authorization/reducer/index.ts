/* eslint-disable no-case-declarations */
import { AuthReducerInterface, AuthActionsInterface } from '../constants/interfaces';
import jwtDecode from '../../../common/jwtdecode';

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
  tokenPayload: {
    role: '',
    login: '',
    userAgent: '',
    userId: 0,
    firstName: '',
    type: '',
    iat: 0,
    exp: 0,
  },
  logout: {
    isLogout: false,
  },

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
        logout: {
          isLogout: false,
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
      let payload: any = {
        role: '',
        login: '',
        userAgent: '',
        firstName: '',
        userId: 0,
        type: '',
        iat: 0,
        exp: 0,
      };
      try {
        payload = jwtDecode(action.token)!;
      } catch (e) {
        console.log(e);
      }
      return {
        ...state,
        tokenPayload: payload,
      };
    case types.AUTH_LOGOUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        logout: {
          isLogout: true,
        },
        verification: {
          ...state.verification,
          success: {
            ...state.verification.success,
            accessToken: '',
            refreshToken: '',
          },
        },
        login: {
          success: {
            status: false,
          },
          error: null,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
