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
import { getConversationMessagesRequest } from "../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../reduxToolkit/app/slice";
import { ILocationParams, IParams } from "../../ts/interfaces/app";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
  },
  errorBackText: { fontSize: 28, fontWeight: "500" },
}));

const loadMessageOffset = 15;

const Chat = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const params = useParams<IParams>();
  const location = useLocation<ILocationParams<any>>();
  const classes = useStyles();

  // REFS
  const refBottom = React.useRef(null);
  const refHeader = React.useRef(null);

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
  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  const heightContent: string = React.useMemo(
    () =>
      `calc(100vh - ${
        (refBottom?.current?.clientHeight || 0) +
        refHeader.current?.clientHeight
      }px)`,
    [refBottom.current?.clientHeight, refHeader.current?.clientHeight]
  );

  // FUNCTIONS
  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (
      pagination.allItems > pagination.currentPage &&
      allMessages[conversationId].length >= loadMessageOffset
    ) {
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: pagination.currentPage + loadMessageOffset,
          },
          cb: (response) => {
            errorBack && setErrorBack("");
            dispatch(
              setAllMessagesAction({
                [conversationId]: [
                  ...response.data,
                  ...allMessages[conversationId],
                ],
              })
            );
          },
          errorCb: (error) => {
            setErrorBack(error.message);
            setIsFetching(false);
          },
        })
      );
    }
  };

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
        ref={refHeader}
      />
      <ChatContent
        heightContent={heightContent}
        typeConversation={typeConversation}
        opponentId={opponentId}
        conversationId={conversationId}
        userId={authToken.userId}
        allMessages={allMessages}
      />
      <ChatBottom
        ref={refBottom}
        firstName={authToken.firstName}
        userId={authToken.userId}
        opponentId={opponentId}
      />
    </Box>
  );
};

export default React.memo(Chat);
