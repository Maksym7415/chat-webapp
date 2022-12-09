import React from "react";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";
import { useAppSelector } from "../../../../hooks/redux";

const ChatBottom = React.forwardRef(
  ({ firstName, userId, openFileDialog, opponentId }: any, ref) => {
    const { selectedMessages } = useAppSelector(({ appSlice }) => appSlice);

    const renderBottom = () => {
      if (Object.keys(selectedMessages).length) {
      } else {
        return (
          <MessageInput
            ref={ref}
            userId={userId}
            firstName={firstName}
            opponentId={opponentId}
            openFileDialog={openFileDialog}
          />
        );
      }
    };

    return (
      <>
        {renderBottom()}
        {/* <BoottomToolbar /> */}
      </>
    );
  }
);

export default React.memo(ChatBottom);
