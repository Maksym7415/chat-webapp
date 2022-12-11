import React from "react";
import { makeStyles } from "@mui/styles";
import ConversationItem from "./components/conversationItem";
import { useAppSelector } from "../../hooks/redux";
import { IConversation } from "../../ts/interfaces/conversations";

// need ts

interface IProps {
  heightContent: string;
}

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: "auto",
    overflowX: "hidden",
    padding: "0px 10px 10px",
    height: "100%",
    position: "relative",
  },
}));

const ConversationsPage = ({ heightContent }: IProps) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const usersTyping = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
  );

  // VARIABLES
  const dataSortDate: any = React.useMemo(
    () =>
      [...Object.values(conversationsList)]?.sort(
        (a: IConversation, b: IConversation) =>
          new Date(b?.Messages?.[0]?.sendDate).getTime() -
          new Date(a?.Messages?.[0]?.sendDate).getTime()
      ) || [],
    [conversationsList]
  );

  return (
    <div className={classes.container} style={{ height: heightContent }}>
      {dataSortDate.map((conversation: IConversation) => {
        return (
          <ConversationItem
            data={conversation}
            usersTyping={usersTyping}
            key={conversation.conversationId}
          />
        );
      })}
    </div>
  );
};

export default ConversationsPage;
