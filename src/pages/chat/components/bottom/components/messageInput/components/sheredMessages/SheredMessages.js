import React from "react";
import makeStyles from "./styles";
import languages from "../../../../../../../../config/translations";
import SvgMaker from "../../../../../../../../components/svgMaker";
import { useAppSelector } from "../../../../../../../../hooks/redux";

export default function SheredMessages({
  forwardMessages,
  handleClearSheraMessages,
}) {
  //HOOKS

  // STYLES
  const styles = makeStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <div style={styles.root}>
      <div style={styles.wrapperLeft}>
        <SvgMaker
          name="svgs_filled_send_arrow"
          // strokeFill={theme.colors.main}
        />
      </div>
      <div style={styles.wrapperCenter}>
        <p style={styles.title}>
          {forwardMessages.length
            ? `Forward ${forwardMessages.length} ${
                forwardMessages.length > 1 ? "messages" : "message"
              }`
            : languages[lang].generals.shareMessage}
        </p>
        <p style="conversations__edit-message-paragraph">
          {(() => {
            if (forwardMessages.length < 2) {
              return forwardMessages[0].message;
            }

            let usersSheredMessages = forwardMessages?.reduce((acc, item) => {
              if (acc.includes(item.User.firstName)) return acc;
              return [...acc, item.User.firstName];
            }, []);

            if (forwardMessages.length > 2) {
              return `from ${usersSheredMessages[0]} and ${
                usersSheredMessages.length - 1
              } more`;
            } else {
              return `from ${usersSheredMessages[0]}${
                usersSheredMessages?.[1] ? `, ${usersSheredMessages?.[1]}` : ""
              }`;
            }
          })()}
        </p>
      </div>
      <div style={styles.wrapperRight}>
        {/* <IconButton
          icon="close"
          size={20}
          onClick={handleClearSheraMessages}
          style={{ marginHorizontal: 0 }}
        /> */}
      </div>
    </div>
  );
}
