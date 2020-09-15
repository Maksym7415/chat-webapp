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
      data: '',
    },
    error: null,
  },
  avatars: {
    success: {
      data: [{
        id: 0,
        fileName: '',
        defaultAvatar: true,
        fkUserId: 0,
      }],
    },
    error: null,
  },
  upload: {
    success: {
      data: '',
    },
    error: null,
  },
};

const UserReducer = (state = initialState, action: interfaces.UserActionsInterface): interfaces.UserReducerInterface => {
  switch (action.type) {
    case types.USER_SUCCESS:
      console.log(action.payload);
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
    case types.USER_CLEAR_DATA:
      return {
        ...state,
        upload: initialState.upload,
      };
    default:
      return state;
  }
};

export default UserReducer;
