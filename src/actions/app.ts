import {
  setDialogConfigAction,
  initialDialogConfig,
  initialSelectedMessages,
  setSelectedMessagesAction,
} from "../reduxToolkit/app/slice";
import store from "../reduxToolkit/store";

export const actionClearDialogConfig = () => {
  return store.dispatch(setDialogConfigAction(initialDialogConfig));
};

export const actionsClearSelectedMessages = (force: any) => {
  const selectedMessages = store.getState().appSlice.selectedMessages;

  if (!Object.keys(selectedMessages.messages).length && !force) return;

  return store.dispatch(setSelectedMessagesAction(initialSelectedMessages));
};
