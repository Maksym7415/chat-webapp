import * as types from './types';
import { PreloaderActionInterface } from './interafaces';

export const PreloaderAction = (isShow: boolean): PreloaderActionInterface => ({
  type: types.APP_PRELOADER,
  payload: isShow,
});
