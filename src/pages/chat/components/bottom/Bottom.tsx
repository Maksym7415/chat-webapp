import React from "react";
import { useParams, useLocation } from "react-router-dom";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";
import { useAppSelector } from "../../../../hooks/redux";
import { ILocationParams, IParams } from "../../../../ts/interfaces/app";

const ChatBottom = ({
  firstName,
  userId,
  opponentId,
  conversationData,
}: any) => {
  // HOOKS
  const params = useParams<IParams>();

  // SELECTORS
  const selectedMessages = useAppSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );

  // VARIABLES
  const conversationId = React.useMemo(() => params?.id || 0, [params]);

  const renderBottom = () => {
    if (selectedMessages.active) {
      return (
        <BottomToolbar
          conversationId={conversationId}
          conversationData={conversationData}
        />
      );
    } else {
      return (
        <MessageInput
          conversationId={conversationId}
          userId={userId}
          firstName={firstName}
          opponentId={opponentId}
        />
      );
    }
  };

  return (
    <>
      {renderBottom()}
      {/* <BottomToolbar /> */}
    </>
  );
};

export default React.memo(ChatBottom);
