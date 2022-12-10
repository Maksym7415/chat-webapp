import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LeftSide from "./components/leftSide";
import MainContent from "./components/mainContent";
import { socket } from "../../config/socket";
import {
  socketOnUserIdChat,
  socketOnTypingStateId,
  socketOnDeleteMessage,
  socketOnUserIdNewChat,
  socketOnDeleteConversation,
  socketOnClearConversation,
} from "../../config/socket/actions/socketOn";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUserProfileDataRequest } from "../../reduxToolkit/user/requests";
import { getUserConversationsRequest } from "../../reduxToolkit/conversations/requests";
import IMAGES from "../../assets/img";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    backgroundImage: `url(${IMAGES.bgTest})`,
  },
}));

const styleRnd: React.CSSProperties = {
  position: "relative",
  borderRight: "1px solid rgba(0, 0, 0, 0.2)",
};

const MainPage = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();

  // SELECTORS
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const authToken = useAppSelector(({ authSlice }) => authSlice.authToken);

  // STATES
  const [containerWidth, setContainerWidth] = useState<number>(300);

  // VARIABLES
  const conversationsListMass: any = React.useMemo(
    () => Object.values(conversationsList),
    [conversationsList]
  );

  // USEEFFECTS
  React.useLayoutEffect(() => {
    if (authToken.userId) {
      dispatch(getUserProfileDataRequest({}));
    }
  }, [authToken]);

  // USEEFFECTS
  React.useLayoutEffect(() => {
    !conversationsListMass?.length && dispatch(getUserConversationsRequest({}));
  }, []);

  React.useEffect(() => {
    socket.removeAllListeners();
    if (conversationsListMass?.length) {
      conversationsListMass.forEach((chat: any) => {
        socketOnUserIdChat(chat);
        socketOnTypingStateId(chat);
      });
    }
    socketOnDeleteMessage();
    socketOnUserIdNewChat(authToken.userId, history);
    socketOnDeleteConversation();
    socketOnClearConversation();
  }, [conversationsListMass]);

  return (
    <div className={classes.container}>
      <Rnd
        style={styleRnd}
        minWidth="20vw"
        maxWidth="40vw"
        default={{
          x: 0,
          y: 0,
          width: containerWidth,
          height: "100%",
        }}
        onResize={(e, direction, ref, delta, position) => {
          ref.offsetWidth < 200 && setContainerWidth(80);
        }}
        disableDragging
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <LeftSide />
      </Rnd>
      <MainContent />
    </div>
  );
};

export default MainPage;
