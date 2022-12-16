import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "../../styles/index.scss";
import ChatHeader from "./components/header/";
import ChatBottom from "./components/bottom";
import ChatContent from "./components/mainContent";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ILocationParams, IParams } from "../../ts/interfaces/app";
import { actionsClearSelectedMessages } from "../../actions";
import { getConversationMessagesRequest } from "../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../reduxToolkit/app/slice";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  errorBackText: { fontSize: 28, fontWeight: "500" },
}));

const Chat = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const params = useParams<IParams>();
  const location = useLocation<ILocationParams<any>>();
  const classes = useStyles();

  // SELECTORS
  const authToken = useAppSelector(({ authSlice }) => authSlice.authToken);
  const userHistoryConversations = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const allMessages = useAppSelector(({ appSlice }) => appSlice.allMessages);
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );

  // STATES
  const [errorBack, setErrorBack] = React.useState<string>("");
  const [isFetching, setIsFetching] = React.useState(false);

  // VARIABLES
  const conversationId = React.useMemo(() => params?.id || 0, [params]);
  const opponentId: any = location?.state?.opponentId;
  const conversationData: any = React.useMemo(
    () =>
      conversationsList?.[conversationId] ||
      location?.state?.conversationData ||
      {},
    [conversationsList, conversationId, location]
  );
  const typeConversation =
    conversationData?.conversationType?.toLowerCase() || "";

  // USEEFFECTS
  React.useLayoutEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      setIsFetching(true);
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
          cb: (response) => {
            let currentDay = 0;
            let newArr = [];
            response.data.map((el) => {
              if (new Date(el.sendDate).getDate() !== currentDay) {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [
                  ...newArr,
                  { component: "div", sendDate: el.sendDate },
                  el,
                ];
              } else {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [...newArr, el];
              }
              return el;
            });
            dispatch(
              setAllMessagesAction({
                [conversationId]: newArr,
              })
            );
            errorBack && setErrorBack("");
            setIsFetching(false);
          },
          errorCb: (error) => {
            setErrorBack(error.message);
            setIsFetching(false);
          },
        })
      );
    }
    return () => {
      actionsClearSelectedMessages(false);
    };
  }, [conversationId]);

  if (isFetching) {
    return (
      <RenderInfoCenterBox>
        <CircularProgress size={60} />
      </RenderInfoCenterBox>
    );
  }

  if (errorBack) {
    return (
      <RenderInfoCenterBox>
        <Typography className={classes.errorBackText}>{errorBack}</Typography>
      </RenderInfoCenterBox>
    );
  }

  return (
    <Box className={classes.container}>
      <ChatHeader
        conversationData={conversationData}
        conversationId={conversationId}
        typeConversation={typeConversation}
        messages={allMessages?.[conversationId] || []}
      />
      <ChatContent
        typeConversation={typeConversation}
        opponentId={opponentId}
        conversationId={conversationId}
        userId={authToken.userId}
        allMessages={allMessages}
        setErrorBack={setErrorBack}
        errorBack={errorBack}
        setIsFetching={setIsFetching}
        conversationData={conversationData}
      />
      <ChatBottom
        firstName={authToken.firstName}
        userId={authToken.userId}
        opponentId={opponentId}
        conversationData={conversationData}
      />
    </Box>
  );
};

export default React.memo(Chat);
