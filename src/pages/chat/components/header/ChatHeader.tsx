import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useStyles from "./styles";
import {
  headerSelectedChatsAmount,
  headerChatDotsOptionsChat,
  headerChatDotsOptionsDialog,
} from "./config";
import { TYPES_CONVERSATIONS } from "../../../../config/constants/general";
import UserAvatar from "../../../../components/avatar/userAvatar";
import SvgMaker from "../../../../components/svgMaker";
import {
  actionsTypeObjectSelected,
  actionsSelectedMessages,
  actionsMessagesChat,
  actionsTypeActionsChat,
  actionsSelectedConversation,
} from "../../../../actions";
import { uuid, findValueKeyInNestedArr } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";
import { setDrawerConfigAction } from "../../../../reduxToolkit/app/slice";
import store from "../../../../reduxToolkit/store";

// need ts
// rework

const ChatHeader = ({ conversationData, conversationId, typeConversation }) => {
  //HOOKS
  const classes = useStyles();
  const history = useHistory();

  // SELECTORS
  const selectedMessages: any = useAppSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [visibleOptions, setVisibleOptions] = React.useState(false);
  const [levelNameChatDotsOptions, setLevelNameChatDotsOptions] =
    React.useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // FUNCTIONS
  const openOptions = () => setVisibleOptions(true);
  const closeOptions = () => {
    setVisibleOptions(false);
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
      actionsSelectedConversation({
        typeAction: action.value,
        dataConversation: conversationData,
      });
    }

    return actionsMessagesChat({
      conversationId,
      typeAction: action.value,
    });

    // store.dispatch(
    //   actionsSelectedMessages(null, actionsTypeObjectSelected.clear)
    // );
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
  const renderTopRightComponent = () => {
    return (
      <>
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
            PaperProps={{
              style: {
                // maxHeight: ITEM_HEIGHT * 4.5,
                // width: "20ch",
              },
            }}
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
                <div className={classes.wrapperIconOption}>
                  {/* <Icon
                        name="arrowleft"
                        size={20}
                        color="#868686"
                        style={{ padding: "0 3.5px" }}
                      /> */}
                </div>
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
                  {/* {isSubMenu ? (
                        <div className={classes.wrapperArrowRight}>
                          <Icon
                            name="right"
                            size={14}
                            color="#868686"
                            style={classes.arrowRight}
                          />
                        </div>
                      ) : null} */}
                </MenuItem>
              );
            })}

            {/* {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))} */}
          </Menu>
        </div>
      </>
    );
  };

  const renderTopLeftComponent = () => {
    return selectedMessagesAmount ? (
      <div className={classes.wrpperSelectedAmount}>
        <p>{selectedMessagesAmount}</p>
      </div>
    ) : (
      <div
        // onClick={() =>
        //   navigation.navigate(PathsName.profile, {
        //     typeProfile: conversationData.conversationType,
        //     conversationData,
        //   })
        // }
        className={classes.wrapperConversationData}
      >
        <div className={classes.wrapperAvatar}>
          <UserAvatar
            source={conversationData?.conversationAvatar}
            name={conversationData?.conversationName || "Test Test"}
            sizeAvatar={38}
            status={""}
          />
        </div>
        <div className={classes.wrapperAvatar}>
          <p className={classes.title}>{conversationData?.conversationName}</p>
          <span className={classes.subtitle}>{"Online*"}</span>
        </div>
      </div>
    );
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
          // navigation.navigate(PathsName.profile, {
          //   typeProfile: conversationData.conversationType,
          //   conversationData,
          // })
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
