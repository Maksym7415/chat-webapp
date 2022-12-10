import React from "react";
import useStyles from "./styles";
import languages from "../../../../../../../../config/translations";
import SvgMaker from "../../../../../../../../components/svgMaker";
import { useAppSelector } from "../../../../../../../../hooks/redux";

// need ts

const SharedMessages = ({
  forwardMessages,
  handleClearSharedMessages,
}: any) => {
  //HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <div className={classes.root}>
      <div className={classes.wrapperLeft}>
        <SvgMaker name="svgs_filled_send_arrow" />
      </div>
      <div className={classes.wrapperCenter}>
        <p className={classes.title}>
          {forwardMessages.length
            ? `Forward ${forwardMessages.length} ${
                forwardMessages.length > 1 ? "messages" : "message"
              }`
            : languages[lang].generals.shareMessage}
        </p>
        <p className="conversations__edit-message-paragraph">
          {(() => {
            if (forwardMessages.length < 2) {
              return forwardMessages[0].message;
            }

            let usersSharedMessages = forwardMessages?.reduce((acc, item) => {
              if (acc.includes(item.User.firstName)) return acc;
              return [...acc, item.User.firstName];
            }, []);

            if (forwardMessages.length > 2) {
              return `from ${usersSharedMessages[0]} and ${
                usersSharedMessages.length - 1
              } more`;
            } else {
              return `from ${usersSharedMessages[0]}${
                usersSharedMessages?.[1] ? `, ${usersSharedMessages?.[1]}` : ""
              }`;
            }
          })()}
        </p>
      </div>
      <div className={classes.wrapperRight}>
        {/* <IconButton
          icon="close"
          size={20}
          onClick={handleClearSharedMessages}
          className={{ marginHorizontal: 0 }}
        /> */}
      </div>
    </div>
  );
};

export default SharedMessages;
