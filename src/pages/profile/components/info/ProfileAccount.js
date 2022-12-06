import React from "react";
import { useTheme } from "@mui/material/classes";
import { Divider } from "@mui/material";
import useStyles from "./classes";
import useStylesListMenu from "../listMenu/classes";

const ProfileAccount = ({ isPhotos }) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);
  const classesListMenu = useStylesListMenu(theme);

  // SELECTORS
  const { lang } = useSelector(({ settingSlice }) => settingSlice);

  return (
    <div
      className={classesListMenu.wrapperList}
      style={{ marginTop: isPhotos ? 0 : 12 }}
    >
      <p className={classesListMenu.listTitle}>Account</p>
      <div className={classesListMenu.list}>
        <div className={classes.wrapperItemAccount}>
          <p className={classes.title}>+1 (234) 567 89 01*</p>
          <p className={classes.subTitle}>Tap to change phone number</p>
        </div>
        <Divider className={classes.divider} />
        <div
          onClick={() => console.log("item")}
          className={classes.wrapperItemAccount}
        >
          <p className={classes.title}>@voidvoidvoidvoidvoid*</p>
          <p className={classes.subTitle}>Username</p>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.wrapperItemAccount}>
          <p className={classes.title}>@voidrainbow*</p>
          <p className={classes.subTitle}>Bio</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccount;
