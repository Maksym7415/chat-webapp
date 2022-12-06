import { updateConversationListAction } from "./slice";

export const conversationListActions = (data) => (dispatch) => {
  switch (data.mode) {
    case "updateMessageConversation":
      return dispatch(
        updateConversationListAction({
          [data.conversationId]: {
            ...data.conversationsList[data.conversationId],
            Messages: data.messages,
          },
        })
      );
    default:
      return null;
  }
};
