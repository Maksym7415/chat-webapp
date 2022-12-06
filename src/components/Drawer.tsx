import React from "react";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import {
  Drawer,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import listRenderByRole from "./drawerList";
import { showDialogAction } from "../redux/common/commonActions";
import { updateUserProfileAction } from "../redux/user/constants/actions";
import { Paths } from "../routing/config/paths";
import { actionLogout } from "../redux/authorization/constants/actionConstants";
import BaseSelect from "./selects/BaseSelect";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 150,
    // [theme.breakpoints.up("sm")]: {
    //   width: 250,
    // },
  },
  wrapperlangs: {
    padding: 15,
  },
}));

interface IDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}

const notLinkItemsRoute = [Paths.signIn];

const languages = [
  {
    id: 1,
    label: "en",
    value: "en",
  },
  {
    id: 1,
    label: "ua",
    value: "ua",
  },
  {
    id: 1,
    label: "ru",
    value: "ru",
  },
];

export default function MiniDrawer({
  openDrawer,
  setOpenDrawer,
}: IDrawerProps) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // FUNCTIONS
  const handleDrawerClose = (value: string) => {
    setOpenDrawer(false);
    if (value === "newChat") {
      dispatch(showDialogAction("Add New Chat"));
    } else if (value === "logout") {
      dispatch(actionLogout());
      history.push(Paths.signIn);
    }
  };

  const hendleSetLenguage = (event: any) => {
    dispatch(updateUserProfileAction({ lang: event.target.value }));
  };

  return (
    <>
      <Drawer anchor={"left"} open={openDrawer} onClose={handleDrawerClose}>
        <div className={classes.list} role="presentation">
          <List>
            {listRenderByRole().map(({ icon, id, title, route, value }) => {
              const bodyItem = (
                <ListItem button>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              );

              return notLinkItemsRoute.includes(route) ? (
                <div
                  style={{ textDecoration: "none" }}
                  key={id}
                  onClick={() => handleDrawerClose(value)}
                >
                  {bodyItem}
                </div>
              ) : (
                <Link
                  to={route}
                  style={{ textDecoration: "none" }}
                  key={id}
                  onClick={() => handleDrawerClose(value)}
                >
                  {bodyItem}
                </Link>
              );
            })}
          </List>
        </div>
        <div className={classes.wrapperlangs}>
          <BaseSelect
            selectSetting={{
              label: "language",
              // selected: lang,
              selected: "aaa",
              options: languages,
              handleChange: hendleSetLenguage,
            }}
          />
        </div>
      </Drawer>
      {/*
        // maybe needed (08.08)
        <NewChatScreen open={open} handleClose={handleClose} setOpenNewChatScreen={setOpenNewChatScreen} />
      */}
    </>
  );
}
