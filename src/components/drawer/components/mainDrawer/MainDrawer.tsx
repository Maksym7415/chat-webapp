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
import useStyles from "./styles";
// import { showDialogAction } from "../../../redux/common/commonActions";
// import { updateUserProfileAction } from "../redux/user/constants/actions";
import { Paths } from "../../../../routing/config/paths";
import { onLogOut } from "../../../../reduxToolkit/auth/actions";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "../../../../reduxToolkit/user/requests";
import { setLangAction } from "../../../../reduxToolkit/setting/slice";
import BaseSelect from "../../../selects/BaseSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

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
    id: 2,
    label: "ua",
    value: "ua",
  },
  {
    id: 3,
    label: "ru",
    value: "ru",
  },
];

function MainDrawer({ closeDrawer }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userInfo = useAppSelector(({ userSlice }) => userSlice.userInfo);

  // FUNCTIONS
  const handleMenuAction = (value: string) => {
    closeDrawer();
    if (value === "newChat") {
      // dispatch(showDialogAction('Add New Chat'));
    } else if (value === "logout") {
      dispatch(onLogOut());
      history.push(Paths.signIn);
    }
  };

  const hendleSetLenguage = (event: any) => {
    const langUser = userInfo.lang;
    const selectLang = event.target.value;
    if (selectLang === langUser) {
      return;
    }
    const sendData = { lang: selectLang };
    dispatch(
      putUpdateProfileRequest({
        data: sendData,
        cb: () => {
          dispatch(
            getUserProfileDataRequest({
              cb: () => {
                console.log(selectLang, "langUser");
                dispatch(setLangAction(selectLang));
              },
            })
          );
        },
      })
    );
  };

  return (
    <>
      <List className={classes.list}>
        {listRenderByRole().map(({ icon, id, title, route, value }) => {
          return (
            <ListItem
              button
              key={id}
              onClick={() => handleMenuAction(value)}
              className={classes.listItem}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          );
        })}
      </List>

      <div className={classes.wrapperlangs}>
        <BaseSelect
          selectSetting={{
            label: "language",
            selected: lang,

            options: languages,
            handleChange: hendleSetLenguage,
          }}
        />
      </div>
    </>
  );
}

export default MainDrawer;
