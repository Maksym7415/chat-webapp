import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useStyles from "./styles";
import {
  headerChatDotsOptionsChat,
  headerChatDotsOptionsDialog,
} from "./config";
import { TYPES_CONVERSATIONS } from "../../../../config/constants/general";
import UserAvatar from "../../../../components/avatar/userAvatar";
import SvgMaker from "../../../../components/svgMaker";
import {
  actionsMessagesChat,
  actionsSelectedConversation,
} from "../../../../actions";
import { findValueKeyInNestedArr } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";
import { setDrawerConfigAction } from "../../../../components/drawer/redux/slice";
import store from "../../../../reduxToolkit/store";

// need ts
// rework

const ChatHeader = ({ conversationData, conversationId, typeConversation }) => {
  //HOOKS
  const classes = useStyles();

  // SELECTORS
  const selectedMessages: any = useAppSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [levelNameChatDotsOptions, setLevelNameChatDotsOptions] =
    React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // FUNCTIONS
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeOptions = () => {
    setTimeout(() => {
      setLevelNameChatDotsOptions("");
    }, 500);
    handleClose();
  };

  const handleOptions = async (action: any, levelNames: any) => {
    if (levelNames) {
      return setLevelNameChatDotsOptions(levelNames);
    }

    closeOptions();

    if (action.type === "conversation") {
      return actionsSelectedConversation({
        typeAction: action.value,
        dataConversation: conversationData,
      });
    }

    return actionsMessagesChat({
      conversationId,
      typeAction: action.value,
    });
  };

  // VARIABLES
  const selectedMessagesAmount: any = Object.keys(
    selectedMessages.messages
  ).length;

  const headerСhatDotsOptions = React.useMemo(() => {
    switch (typeConversation) {
      case TYPES_CONVERSATIONS.dialog:
        return levelNameChatDotsOptions
          ? findValueKeyInNestedArr(
              headerChatDotsOptionsDialog(lang),
              "levelNames",
              levelNameChatDotsOptions,
              "subMenu",
              "subMenu"
            )
          : headerChatDotsOptionsDialog(lang);
      case TYPES_CONVERSATIONS.chat:
        return levelNameChatDotsOptions
          ? findValueKeyInNestedArr(
              headerChatDotsOptionsChat(lang),
              "levelNames",
              levelNameChatDotsOptions,
              "subMenu",
              "subMenu"
            )
          : headerChatDotsOptionsChat(lang);
      default:
        return [];
    }
  }, [typeConversation, levelNameChatDotsOptions]);

  // RENDERS
  const renderTopLeftComponent = () => {
    return <></>;
  };

  const renderTopCenterComponent = () => {
    return (
      <div
        onClick={() => {
          store.dispatch(
            setDrawerConfigAction({
              anchor: "right",
              open: true,
              width: "400px",
              type: "profile",
              configContent: {
                typeProfile: conversationData.conversationType,
                conversationData,
              },
            })
          );
        }}
        className={classes.wrapperConversationData}
      >
        <div className={classes.wrapperAvatar}>
          <UserAvatar
            source={conversationData?.conversationAvatar}
            name={conversationData?.conversationName || "Test Test"}
            sizeAvatar={38}
          />
        </div>
        <div className={classes.wrapperAvatar}>
          <p className={classes.title}>{conversationData?.conversationName}</p>
          <span className={classes.subtitle}>{"Online*"}</span>
        </div>
      </div>
    );
  };

  const renderTopRightComponent = () => {
    return (
      <div className={clsx(classes.wrapperAction, classes.wrapperOptions)}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {levelNameChatDotsOptions ? (
            <MenuItem
              className={classes.dotsOption}
              onClick={() => {
                setLevelNameChatDotsOptions((prev) =>
                  prev.split("_").slice(0, -1).join("_")
                );
              }}
            >
              <div className={classes.wrapperIconOption}></div>
              <p>Back</p>
            </MenuItem>
          ) : null}
          {headerСhatDotsOptions.map((action) => {
            const isSubMenu = action?.subMenu?.length && action.levelNames;
            return (
              <MenuItem
                key={action.id}
                className={classes.dotsOption}
                style={{
                  marginRight: isSubMenu ? 26 : 0,
                }}
                onClick={() => handleOptions(action, action.levelNames)}
              >
                {action.icon.name && (
                  <div className={classes.wrapperIconOption}>
                    <SvgMaker name={action.icon.name} />
                  </div>
                )}
                <p>{action.title}</p>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerTop}>
        {/* {renderTopLeftComponent()} */}
        {renderTopCenterComponent()}
        {renderTopRightComponent()}
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);
