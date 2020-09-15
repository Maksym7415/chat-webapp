/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as types from '../actions/types';
import * as interfaces from '../actions/interfaces';

const initialState: interfaces.UserReducerInterface = {
  userInfo: {
    success: {
      data: {
        id: 0,
        login: '',
        firstName: '',
        lastName: '',
        tagName: '',
        fullName: '',
        status: '',
        userAvatar: '',
        userCreationTime: '',
        userUpdateTime: '',
        userLastTimeOnline: '',
        Roles: [],
      },
    },
    error: null,
  },
  setMainPhoto: {
    success: {
      message: '',
    },
    error: null,
  },
};

const UserReducer = (state = initialState, action: interfaces.UserActionsInterface): interfaces.UserReducerInterface => {
  switch (action.type) {
    case types.USER_SUCCESS:
      return {
        ...state,
        [action.name]: {
          success: action.payload,
          error: null,
        },
      };
    case types.USER_FAIL:
      return {
        ...state,
        [action.name]: {
          error: action.payload,
          ...initialState[action.name],
        },
      };
    default:
      return state;
  }
};

export default UserReducer;
