import React from "react";
import ConversationItems from "./components/conversationItems";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";

export default function SignIn() {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  // STATES
  const [usersTyping, setUsersTyping] = React.useState<any>({});

  // FUNCTIONS

  return (
    <>
      <ConversationItems
        data={Object.values(conversationsList)}
        usersTyping={usersTyping}
      />
    </>
  );
}
