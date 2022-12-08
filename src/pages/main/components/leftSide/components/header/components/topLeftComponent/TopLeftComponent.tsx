import React from "react";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../hooks/redux";
import {
  setDrawerStateAction,
  setSideLeftConfigAction,
} from "../../../../../../../../reduxToolkit/app/slice";
import { eSideLeftConfigPage } from "../../../../../../../../ts/enums/app";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: "15px",
  },
}));

const TopLeftComponent = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const sideLeftConfig = useAppSelector(
    ({ appSlice }) => appSlice.sideLeftConfig
  );

  return (
    <div className={classes.container}>
      {(() => {
        if (
          [eSideLeftConfigPage.conversationList].includes(sideLeftConfig.page)
        ) {
          return (
            <>
              <IconButton
                color="default"
                aria-label="menu"
                edge="end"
                onClick={() => {
                  dispatch(
                    setDrawerStateAction({
                      anchor: "left",
                      open: true,
                      type: "main",
                    })
                  );
                }}
              >
                <MenuIcon />
              </IconButton>
            </>
          );
        } else {
          return (
            <IconButton
              color="default"
              aria-label="back"
              edge="end"
              onClick={() => {
                dispatch(
                  setSideLeftConfigAction({
                    page: eSideLeftConfigPage.conversationList,
                  })
                );
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          );
        }
      })()}
    </div>
  );
};

export default TopLeftComponent;
