import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MainDrawer from "./components/mainDrawer";
import ProfilePage from "../../pages/profile";
import useStyles from "./styles";
import { setDrawerStateAction } from "../../reduxToolkit/app/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const drawerState: any = useAppSelector(
    ({ appSlice }) => appSlice.drawerState
  );

  // FUNCTIONS
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      dispatch(
        setDrawerStateAction({
          anchor,
          open,
        })
      );
    };

  const renderContent = (anchor: Anchor) => (
    <Box
      sx={{ width: drawerState?.width || 300 }}
      // role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {(() => {
        switch (drawerState?.type) {
          case "profile":
            return (
              <ProfilePage
                typeProfile={drawerState.configContent?.typeProfile}
                conversationData={drawerState.configContent?.conversationData}
              />
            );
          case "main":
            return <MainDrawer closeDrawer={toggleDrawer(anchor, false)} />;
          default:
            return <></>;
        }
      })()}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={drawerState.anchor}
      open={drawerState.open}
      onClose={toggleDrawer(drawerState.anchor, false)}
      onOpen={toggleDrawer(drawerState.anchor, true)}
    >
      {renderContent(drawerState.anchor)}
    </SwipeableDrawer>
  );
}
