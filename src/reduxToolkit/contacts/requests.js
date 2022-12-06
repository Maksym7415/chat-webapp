import {createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../config/axios';
import {pathBackSearch} from '../../config/constants/urlBack';

export const postCheckEmailsRequest = createAsyncThunk(
  'contacts/postCheckEmailsRequest',
  async (options, {dispatch}) => {
    try {
      const response = await API.post(pathBackSearch.checkEmails, {
        ...options.data,
      });

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      options?.errorCb && options.errorCb();
      return Promise.reject(error);
    } finally {
    }
  },
);
