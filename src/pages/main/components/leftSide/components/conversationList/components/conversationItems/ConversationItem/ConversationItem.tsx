import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Typography, Avatar, Badge } from "@mui/material";
import clsx from "clsx";
import { contextMenu } from "react-contexify";
import { getCurrentDay } from "../../../../../../../../../helpers";
import contextMenuCallback from "../../../../../../../../../components/contextMenu/eventCallback";
import { showDialogAction } from "../../../../../../../../../redux/common/commonActions";
import { selectedConversationContext } from "../config";
import UserAvatar from "../../../../../../../../../components/avatar/userAvatar";
import SvgMaker from "../../../../../../../../../components/svgMaker";
import { Paths } from "../../../../../../../../../routing/config/paths";
import useStyles from "./styles";
import languages from "../../../../../../../../../config/translations";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../../hooks/redux";
import {
  selectedСhatsActions,
  actionsTypeObjectSelected,
  actionsSelectedConversation,
} from "../../../../../../../../../reduxToolkit/app/actions";
import { ConversationsList } from "../../../../../../../../../redux/conversations/constants/interfaces";
import {
  setContextMenuConfigAction,
  setSelectedСhatsAction,
} from "../../../../../../../../../reduxToolkit/app/slice";
import store from "../../../../../../../../../reduxToolkit/store";

const MENU_ID = "menu-id";

function ConversationItem({ data, usersTyping }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<any>();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  // const { selectedСhats } = useSelector(({ appSlice }) => appSlice);
  const { userId } = useAppSelector(({ authSlice }) => authSlice.tokenPayload);

  // FUNCTIONS
  const getString = (element) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter(
      (el: any) => el.isTyping && el.userId !== userId
    );
    let str = "";
    arr.forEach((el: any) => (str += el.firstName));
    return str;
  };

  const handleClickChatItem = (
    element: ConversationsList,
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    // contextMenuCallback(event, id, [], dispatch);
    history.push(`${Paths.chat}/${id}`, {
      id: data.conversationId,
      conversationData: data,
    });
  };

  const handleClickContextChatItem = (item) => {
    store.dispatch(actionsSelectedConversation(item.value));
  };

  // VARIABLES
  const someBodyWritting = usersTyping[data.conversationId] && getString(data);
  const isConversationDialog = data.conversationType === "Dialog";

  // test
  const numberOfUnreadMessages = [1, 7].includes(data.conversationId)
    ? data.conversationId
    : null;
  const isMessageUserAuth = data.Messages[0]?.User?.id === userId;
  const isReadMessageUserAuth = [1, 7].includes(data.conversationId)
    ? true
    : false;

  return (
    <div
      onContextMenu={(event: React.MouseEvent<HTMLElement>) => {
        dispatch(
          setContextMenuConfigAction({
            isShowMenu: true,
            messageId: 0,
            config: selectedConversationContext(lang),
            callBackItem: handleClickContextChatItem,
          })
        );
        contextMenu.show({
          id: MENU_ID,
          event: event,
        });
        dispatch(setSelectedСhatsAction({ [data.conversationId]: data }));
      }}
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        handleClickChatItem(data, event, data.conversationId)
      }
      className={clsx(classes.container, {
        [classes.activeConversation]: data.conversationId === +params.id,
      })}
    >
      <div className={classes.dataView}>
        <div className={classes.avatarView}>
          <UserAvatar
            source={data.conversationAvatar}
            status={!isConversationDialog ? "online" : ""}
            name={data.conversationName}
            sizeAvatar={48}
            // isSelected={selectedСhats?.[data.conversationId]}
          />
        </div>
        <div className={classes.wrapperBody}>
          <div className={classes.wrapperTop}>
            <div className={classes.wrapperTopLeft}>
              <span className={classes.title}>{data.conversationName}</span>
            </div>
            <div className={classes.wrapperTopRight}>
              <div className={classes.wrapperTopRightStatus}>
                {isMessageUserAuth ? (
                  <>
                    {isReadMessageUserAuth ? (
                      <SvgMaker
                        name="svgs_line_read"
                        width={20}
                        height={19}
                        strokeFill={"#48A938"}
                      />
                    ) : (
                      <SvgMaker
                        name="svgs_line_check"
                        width={20}
                        height={19}
                        strokeFill={"#48A938"}
                      />
                    )}
                  </>
                ) : null}
              </div>
              <span className={classes.time}>
                {data.Messages[0] === undefined
                  ? ""
                  : getCurrentDay(new Date(data.Messages[0].sendDate), false)}
              </span>
            </div>
          </div>
          <div className={classes.message}>
            {someBodyWritting ? (
              <p
                className={classes.messageText}
              >{`${languages[lang].generals.isTyping}... (${someBodyWritting})`}</p>
            ) : (
              <div className={classes.innerMessage}>
                {(() => {
                  const renderTextMessage = (message) => {
                    return <p className={classes.messageText}>{message}</p>;
                  };
                  if (data.Messages[0] !== undefined) {
                    if (isMessageUserAuth) {
                      return (
                        <>
                          <p
                            className={classes.whoSenderName}
                          >{`${languages[lang].generals.you}`}</p>
                          {renderTextMessage(data.Messages[0].message)}
                        </>
                      );
                    } else {
                      if (!isConversationDialog) {
                        return renderTextMessage(data.Messages[0].message);
                      } else {
                        return renderTextMessage(
                          `${data.Messages[0]?.User?.firstName}: ${data.Messages[0].message}`
                        );
                      }
                    }
                  } else {
                    return renderTextMessage(
                      languages[lang].generals.noMessages
                    );
                  }
                })()}
              </div>
            )}
            {/* <Badge
              visible={numberOfUnreadMessages}
              className={classes.numberOfUnreadMessages}
              size={24}
            >
              {numberOfUnreadMessages}
            </Badge> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ConversationItem);
