import React from "react";
import ConversationItems from "./components/conversationItems";
import { useAppSelector } from "../../hooks/redux";

const ConversationList = ({ heightContent }: any) => {
  // SELECTORS
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const usersTyping = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
  );

  return (
    <>
      <ConversationItems
        data={Object.values(conversationsList)}
        usersTyping={usersTyping}
        heightContent={heightContent}
      />
    </>
  );
};

export default ConversationList;
