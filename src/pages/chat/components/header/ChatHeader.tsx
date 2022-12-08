import React from "react";
import clsx from "clsx";
import useStyles from "./styles";
import {
  headerSelectedСhatsAmount,
  // headerСhatDotsOptionsChat,
  // headerСhatDotsOptionsDialog,
} from "./config";
// import {PathsName} from '../../../../navigation/navigationConfig';
import UserAvatar from "../../../../components/avatar/userAvatar";
import SvgMaker from "../../../../components/svgMaker";
// import Header from "../../../../components/header";
// import MenuPaper from "../../../../components/menu/menuPaper";
import {
  actionsTypeObjectSelected,
  selectedMessagesActions,
  actionsMessagesChat,
  actionsTypeActionsChat,
} from "../../../../reduxToolkit/app/actions";
import store from "../../../../reduxToolkit/store";
import { uuid, findValueKeyInNestedArr } from "../../../../helpers";
// import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';
import { setDrawerStateAction } from "../../../../reduxToolkit/app/slice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const ChatHeader = React.forwardRef(
  ({ conversationData, conversationId, typeConversation }: any, ref: any) => {
    //HOOKS

    console.log("ChatHeader");
    // STYLES
    const classes = useStyles();

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

    // FUNCTIONS
    const openOptions = () => setVisibleOptions(true);
    const closeOptions = () => {
      setVisibleOptions(false);
      setTimeout(() => {
        setLevelNameChatDotsOptions("");
      }, 500);
    };
    const handleOptions = (typeAction: any, levelNames: any) => {
      if (levelNames) {
        return setLevelNameChatDotsOptions(levelNames);
      }

      // store.dispatch(
      //   actionsMessagesChat(
      //     {
      //       conversationId: conversationId,
      //       selectedMessages,
      //     },
      //     typeAction,
      //     navigation,
      //     {
      //       id: conversationId,
      //       conversationData,
      //     }
      //   )
      // );
      closeOptions();
      store.dispatch(
        selectedMessagesActions(null, actionsTypeObjectSelected.clear)
      );
    };

    // VARIABLES
    const selectedMessagesAmount: any = Object.keys(selectedMessages).length;

    const headerСhatDotsOptions = React.useMemo(() => {
      switch (typeConversation) {
        // case TYPES_CONVERSATIONS.dialog:
        //   return levelNameChatDotsOptions
        //     ? findValueKeyInNestedArr(
        //         headerСhatDotsOptionsDialog(lang),
        //         'levelNames',
        //         levelNameChatDotsOptions,
        //         'subMenu',
        //         'subMenu',
        //       )
        //     : headerСhatDotsOptionsDialog(lang);
        // case TYPES_CONVERSATIONS.chat:
        //   return levelNameChatDotsOptions
        //     ? findValueKeyInNestedArr(
        //         headerСhatDotsOptionsChat(lang),
        //         'levelNames',
        //         levelNameChatDotsOptions,
        //         'subMenu',
        //         'subMenu',
        //       )
        //     : headerСhatDotsOptionsChat(lang);
        default:
          return [];
      }
    }, [typeConversation, levelNameChatDotsOptions]);

    // RENDERS
    const renderTopRightComponent = () => {
      return selectedMessagesAmount ? (
        <div className={classes.wrapperActions}>
          {headerSelectedСhatsAmount(lang).map((action) => {
            //check for edit action
            if ([actionsTypeActionsChat.editMessage].includes(action.value)) {
              const selectedMessageFirst: any =
                Object.values(selectedMessages)?.[0];
              if (
                selectedMessagesAmount > 1 ||
                selectedMessageFirst?.User?.id !== userInfo.id
              ) {
                return;
              }
            }
            return (
              <div
                key={uuid()}
                className={classes.wrapperAction}
                onClick={() => handleOptions(action.value, null)}
              >
                <SvgMaker name={action.icon.name} />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div>
            <SvgMaker name="svgs_filled_phone" />
          </div>
          <div className={clsx(classes.wrapperAction, classes.wrapperOptions)}>
            {/* <MenuPaper
            anchor={{strokeFill: '#ffffff'}}
            setShowMenu={bool => {
              bool ? openOptions() : closeOptions();
            }}
            showMenu={visibleOptions}>
            <div className={classes.options}>
              {levelNameChatDotsOptions ? (
                <div
                  className={classes.dotsOption}
                  onClick={() => {
                    setLevelNameChatDotsOptions(prev =>
                      prev.split('_').slice(0, -1).join('_'),
                    );
                  }}>
                  <div className={classes.wrapperIconOption}>
                    <Icon
                      name="arrowleft"
                      size={20}
                      color="#868686"
                      style={{padding: "0 3.5px"}}
                    />
                  </div>
                  <Text>Back</Text>
                </div>
              ) : null}
              {headerСhatDotsOptions.map(action => {
                const isSubMenu = action?.subMenu?.length && action.levelNames;
                return (
                  <div
                    key={action.id}
                    style={{
                      ...classes.dotsOption,
                      marginRight: isSubMenu ? 26 : 0,
                    }}
                    onClick={() =>
                      handleOptions(
                        action.value,
                        action.levelNames,
                        action.noFunctional,
                      )
                    }>
                    {action.icon.name && (
                      <View className={classes.wrapperIconOption}>
                        <SvgMaker name={action.icon.name} />
                      </View>
                    )}
                    <p>{action.title}</p>
                    {isSubMenu ? (
                      <div className={classes.wrapperArrowRight}>
                        <Icon
                          name="right"
                          size={14}
                          color="#868686"
                          style={classes.arrowRight}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </MenuPaper> */}
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
            />
          </div>
          <div className={classes.wrapperAvatar}>
            <p className={classes.title}>
              {conversationData?.conversationName}
            </p>
            <span className={classes.subtitle}>{"Online*"}</span>
          </div>
        </div>
      );
    };

    const renderTopCenterComponent = () => {
      return selectedMessagesAmount ? (
        <div className={classes.wrpperSelectedAmount}>
          <p>{selectedMessagesAmount}</p>
        </div>
      ) : (
        <div
          onClick={() => {
            store.dispatch(
              setDrawerStateAction({
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
            <p className={classes.title}>
              {conversationData?.conversationName}
            </p>
            <span className={classes.subtitle}>{"Online*"}</span>
          </div>
        </div>
      );
    };
    return (
      <div
        className={
          selectedMessagesAmount
            ? classes.selectedMessagesAmountContainer
            : classes.container
        }
        ref={ref}
      >
        <div className={classes.containerTop}>
          {/* {renderTopLeftComponent()} */}
          {renderTopCenterComponent()}
          {renderTopRightComponent()}
        </div>
      </div>
    );
  }
);

export default React.memo(ChatHeader);
