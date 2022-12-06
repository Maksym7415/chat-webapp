import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import useStyles from "./styles";
import Chat from "../chat";
import LeftSide from "./components/leftSide";
import { socket } from "../../config/socket";
import {
  socketOnUserIdChat,
  // socketOnTypingStateId,
  socketOnDeleteMessage,
  socketOnUserIdNewChat,
  socketOnDeleteConversation,
  socketOnClearConversation,
} from "../../config/socket/actions/socketOn";
import "./styles/index.scss";
import { getUserConversationsRequest } from "../../reduxToolkit/conversations/requests";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import languages from "../../config/translations";

export default function MainPage() {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const params = useParams<any>();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  const typing = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
  );
  const { userId } = useAppSelector(({ authSlice }) => authSlice.tokenPayload);

  // VARIABLES
  const conversationsListMass: any = Object.values(conversationsList);

  // STATES
  // usersTyping треба буде зробити певно через redux
  // const [usersTyping, setUsersTyping] = useState<Conversation>({});
  const [containerWidth, setContainerWidth] = useState<number>(300);

  // USEEFFECTS
  React.useEffect(() => {
    !conversationsListMass?.length && dispatch(getUserConversationsRequest());
  }, []);

  React.useEffect(() => {
    socket.removeAllListeners();

    if (conversationsListMass?.length) {
      conversationsListMass.forEach((chat: any) => {
        socketOnUserIdChat(chat);
        // socketOnTypingStateId(chat, setUsersTyping);
      });
    }
  }, [conversationsListMass, typing]);

  React.useEffect(() => {
    socketOnDeleteMessage();
    socketOnUserIdNewChat(userId, history);
    socketOnDeleteConversation();
    socketOnClearConversation();
  }, [conversationsList]);

  // RENDERS
  const renderChat = React.useMemo(() => {
    if (!params?.id) {
      return (
        <RenderInfoCenterBox>
          <Typography style={{ fontSize: 28, fontWeight: "500" }}>
            {languages[lang].mainScreen.chooseAChat}
          </Typography>
        </RenderInfoCenterBox>
      );
    }
    return <Chat />;
  }, [params, conversationsList]);

  return (
    <div className={classes.container}>
      <Rnd
        style={{
          position: "relative",
          borderRight: "1px solid rgba(0, 0, 0, 0.2)",
          // background: "#dcf2ed",
        }}
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
      {renderChat}
    </div>
  );
}
