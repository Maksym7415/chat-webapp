import React from "react";
import useStyles from "./styles";
import ConversationItem from "./ConversationItem/ConversationItem";

function ConversationItems({ data, usersTyping }: any) {
  // HOOKS
  const classes = useStyles();

  // VARIABLES
  const dataSortDate: any = React.useMemo(
    () =>
      [...data]?.sort(
        (a: any, b: any) =>
          new Date(b?.Messages?.[0]?.sendDate).getTime() -
          new Date(a?.Messages?.[0]?.sendDate).getTime()
      ) || [],
    [data]
  );

  return (
    <div className={classes.container}>
      {dataSortDate.map((conversation) => {
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
}

export default React.memo(ConversationItems);
