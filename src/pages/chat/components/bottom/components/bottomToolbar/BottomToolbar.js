import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { Typography, Toolbar, Button, Paper, IconButton } from "@mui/material";
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
  actionsMessagesChat,
  actionsTypeActionsChat,
} from "../../../../../../reduxToolkit/app/actions";
import store from "../../../../../../reduxToolkit/store";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";

function BottomToolbar() {
  // HOOKS
  // const navigation = useNavigation();
  // const route = useRoute();

  // STYLES

  // SELECTORS
  const { selectedMessages } = useAppSelector(({ appSlice }) => appSlice);

  // VARIABLES
  const route = { params: {} };
  const selectedMessagesAmount = Object.keys(selectedMessages).length;
  const conversationId = route?.params?.id;
  const conversationData = route?.params?.conversationData;

  // FUNCTIONS
  const handleOptions = (typeAction) => {
    store.dispatch(
      actionsMessagesChat(
        {
          conversationId: conversationId,
          selectedMessages,
        },
        typeAction,
        navigation,
        {
          id: conversationId,
          conversationData,
        }
      )
    );
    store.dispatch(
      selectedMessagesActions(null, actionsTypeObjectSelected.clear)
    );
  };

  return (
    <Paper
      style={{
        width: "80%",
        bottom: 20,
        position: "absolute",
        left: "50%",
      }}
      elevation={12}
      variant={"dense"}
    >
      {/* <IconButton size="large" color="inherit">
        <ArrowForwardIcon />
      </IconButton>
      <IconButton size="large" color="inherit">
        <FileCopyOutlinedIcon />
      </IconButton> */}
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          1 message selected
        </Typography>
        <IconButton size="large" color="inherit">
          <ArrowForwardIcon />
        </IconButton>
        <IconButton size="large" color="inherit">
          <FileCopyOutlinedIcon />
        </IconButton>
      </Toolbar>
    </Paper>
  );
}

export default BottomToolbar;
