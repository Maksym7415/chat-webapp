import React from "react";
import { Switch, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import useStylesListMenu from "../listMenu/styles";
import RITitleWithSubtitleAndRightComponent from "../../../../components/renders/rendersItem/RITitleWithSubtitleAndRightComponent";
import { TYPES_CONVERSATIONS } from "../../../../config/constants/general";
import { AnyAaaaRecord } from "dns";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const MainInfo = ({ typeProfile }: any) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);
  const classesListMenu = useStylesListMenu(theme);

  // SELECTORS
  const { lang } = useAppSelector(({ settingSlice }) => settingSlice);

  // STATES
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  // FUNCTIONS
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <div className={classesListMenu.wrapperList}>
      {(() => {
        switch (typeProfile) {
          case TYPES_CONVERSATIONS.dialog:
            return (
              <>
                <p className={classesListMenu.listTitle}>Data</p>
                <div className={classesListMenu.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={"+1 (234) 567 89 01*"}
                    subTitle={"Phone number"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                  <Divider className={classes.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={`I'm fine and you?*`}
                    subTitle={"About myself"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                  <Divider className={classes.divider} />
                  <RITitleWithSubtitleAndRightComponent
                    title={"@voidrainbow*"}
                    subTitle={"Pseudonym"}
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                      wrapperItemLeft: {},
                      title: {},
                      subTitle: {},
                    }}
                  />
                </div>
                <Divider className={classes.divider} />
              </>
            );
          case TYPES_CONVERSATIONS.group:
            return (
              <>
                <p className={classesListMenu.listTitle}>Вescription</p>
                <div className={classesListMenu.list}>
                  <RITitleWithSubtitleAndRightComponent
                    title={
                      "a spoken or written representation or account of a person, object, or event.*"
                    }
                    styles={{
                      wrapperItem: {
                        paddingLeft: 0,
                      },
                    }}
                  />
                </div>
                <Divider className={classes.divider} />
              </>
            );
          default:
            return <></>;
        }
      })()}
      <RITitleWithSubtitleAndRightComponent
        title={"Notification"}
        subTitle={isSwitchOn ? "enabled" : "turned off"}
        styles={{
          wrapperItem: {
            paddingLeft: 0,
          },
          wrapperItemLeft: {},
          title: {},
          subTitle: {},
        }}
        renderRightComponent={() => {
          return (
            <div className={classes.wrapperNotification}>
              <Divider
                className={classes.dividerNotification}
                orientation="vertical"
                flexItem
              />
              <Switch
                value={isSwitchOn}
                onChange={onToggleSwitch}
                className={classes.switchNotification}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default MainInfo;
