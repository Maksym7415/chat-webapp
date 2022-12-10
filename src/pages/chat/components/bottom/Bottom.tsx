import React from "react";
import MessageInput from "./components/messageInput/MessageInput";
import BottomToolbar from "./components/bottomToolbar";
import { useAppSelector } from "../../../../hooks/redux";

const ChatBottom = React.forwardRef<HTMLInputElement, any>(
  ({ firstName, userId, openFileDialog, opponentId }, ref) => {
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
        {/* <BottomToolbar /> */}
      </>
    );
  }
);

export default React.memo(ChatBottom);
