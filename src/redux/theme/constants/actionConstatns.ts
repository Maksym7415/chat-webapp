import * as types from './types';
import { ThemeActionsInterface } from './interfaces';

export const showMessage = (options: object): ThemeActionsInterface => ({
  type: types.THEME_SHOW_MESSAGE,
  options,
});

export const hideMessage = (): ThemeActionsInterface => ({
  type: types.THEME_HIDE_MESSAGE,
});

export const startLoading = (): ThemeActionsInterface => ({
  type: types.THEME_START_LOAIDING,
  isLoading: true,
});

export const stopLoading = (): ThemeActionsInterface => ({
  type: types.THEME_STOP_LOADING,
  isLoading: false,
});
