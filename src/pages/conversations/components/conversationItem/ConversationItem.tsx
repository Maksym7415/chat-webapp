import React from "react";
import { useParams, useHistory } from "react-router-dom";
import clsx from "clsx";
import { contextMenu } from "react-contexify";
import { selectedConversationContext } from "./config";
import useStyles from "./styles";
import UserAvatar from "../../../../components/avatar/userAvatar";
import SvgMaker from "../../../../components/svgMaker";
import { getCurrentDay } from "../../../../helpers";
import { Paths } from "../../../../routing/config/paths";
import languages from "../../../../config/translations";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { actionsSelectedConversation } from "../../../../actions";
import {
  setContextMenuConfigAction,
  setSelectedChatsAction,
} from "../../../../reduxToolkit/app/slice";
import store from "../../../../reduxToolkit/store";
import { IParams } from "../../../../ts/interfaces/app";
import { eContextMenuId } from "../../../../ts/enums/app";
import { IConversation } from "../../../../ts/interfaces/conversations";

interface IProps {
  data: IConversation;
  usersTyping: any;
}

const ConversationItem = ({ data, usersTyping }: IProps) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<IParams>();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const authToken = useAppSelector(({ authSlice }) => authSlice.authToken);

  // FUNCTIONS
  const getString = (element: IConversation) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter(
      (el: any) => el.isTyping && el.userId !== authToken.userId
    );
    let str = "";
    arr.forEach((el: any) => (str += el.firstName));
    return str;
  };

  const handleClickChatItem = (id: number) => {
    if (+params.id === id) return;

    history.push(`${Paths.chat}/${id}`, {
      id: data.conversationId,
      conversationData: data,
    });
  };

  const handleClickContextChatItem = (item) => {
    actionsSelectedConversation({
      typeAction: item.value,
      dataConversation: data,
    });
  };

  // VARIABLES
  const someBodyWriting: string =
    usersTyping[data.conversationId] && getString(data);
  const isConversationDialog: boolean = data.conversationType === "Dialog";

  // test
  const numberOfUnreadMessages = [1, 7].includes(data.conversationId)
    ? data.conversationId
    : null;
  const isMessageUserAuth: boolean =
    data.Messages[0]?.User?.id === authToken.userId;
  const isReadMessageUserAuth: boolean = [1, 7].includes(data.conversationId)
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
          id: eContextMenuId.main,
          event: event,
        });
        // dispatch(setSelectedChatsAction({ [data.conversationId]: data }));
      }}
      onClick={() => handleClickChatItem(data.conversationId)}
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
            {someBodyWriting ? (
              <p
                className={classes.messageText}
              >{`${languages[lang].generals.isTyping}... (${someBodyWriting})`}</p>
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
};

export default React.memo(ConversationItem);
