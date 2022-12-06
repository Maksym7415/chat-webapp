import React from "react";
// import { useParams } from "react-router-dom";
import useStyles from "./styles";
import ConversationItem from "./ConversationItem/ConversationItem";
import { contextMenuAction } from "../../../../../../../../redux/common/commonActions";
import { useAppDispatch } from "../../../../../../../../hooks/redux";

function ConversationItems({ data, usersTyping }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  // const params = useParams<any>();

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

  // FUNCTIONS
  const closeContextMenuAction = () =>
    dispatch(
      contextMenuAction({
        yPos: "",
        xPos: "",
        isShowMenu: false,
        messageId: 0,
        config: [],
      })
    );

  const handleCloseContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === "contextmenu") {
      event.preventDefault();
    }
    if (event.type === "click") {
      closeContextMenuAction();
    }
  };

  return (
    <div
      onClick={handleCloseContextMenu}
      onContextMenu={handleCloseContextMenu}
      className={classes.container}
    >
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
