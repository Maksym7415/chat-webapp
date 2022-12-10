import React from "react";
import { Divider } from "@mui/material";
import useStyles from "./styles";
import useStylesListMenu from "../listMenu/styles";
import RITitleWithSubtitleAndRightComponent from "../../../../components/renders/rendersItem/RITitleWithSubtitleAndRightComponent";
import { useAppSelector } from "../../../../hooks/redux";

// need ts

const ProfileAccount = ({ avatar, userInfo }: any) => {
  // HOOKS
  const classes = useStyles();
  const classesListMenu = useStylesListMenu();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <div
      className={classesListMenu.wrapperList}
      style={{
        marginTop: avatar ? 0 : 12,
      }}
    >
      <p className={classesListMenu.listTitle}>Account</p>
      <div className={classesListMenu.list}>
        <RITitleWithSubtitleAndRightComponent
          title={"+1 (234) 567 89 01*"}
          subTitle={"Tap to change phone number"}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
        <Divider className={classes.divider} />
        <RITitleWithSubtitleAndRightComponent
          title={userInfo?.tagName || ""}
          subTitle={"Username"}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
        <Divider className={classes.divider} />
        <RITitleWithSubtitleAndRightComponent
          title={"@voidrainbow*"}
          subTitle={"Bio"}
          styles={{
            wrapperItem: {
              paddingLeft: 0,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfileAccount;
