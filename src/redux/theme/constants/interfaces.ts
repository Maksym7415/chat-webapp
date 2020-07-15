import * as types from './types';

interface ShowMessage {
    type: typeof types.THEME_SHOW_MESSAGE
    options: object
}

interface HideMessage {
    type: typeof types.THEME_HIDE_MESSAGE
}

interface StartLoading {
    type: typeof types.THEME_START_LOAIDING
    isLoading: boolean
}

interface StopLoading {
    type: typeof types.THEME_STOP_LOADING
    isLoading: boolean
}

export type ThemeActionsInterface = ShowMessage | HideMessage | StartLoading | StopLoading