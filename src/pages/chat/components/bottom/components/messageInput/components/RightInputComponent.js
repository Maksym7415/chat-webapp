import React from "react";
import useStyles from "../styles";
import SvgMaker from "../../../../../../../components/svgMaker";

export default function RightInputComponent({
  message,
  handleSendMessage,
  forwardMessages,
}) {
  // HOOKS
  const classes = useStyles();

  // STATES
  const [toggleTypeMessage, setToggleTypeMessage] = React.useState("voice");

  // FUNCTIONS
  const stylesRightIcons = () => {
    return message || forwardMessages.length
      ? {
          justifyContent: "flex-end",
          width: 40,
        }
      : {
          justifyContent: "space-between",
          width: 80,
        };
  };

  return (
    <>
      <div className={classes.attachAndTypeMessage} styles={stylesRightIcons()}>
        {message || forwardMessages.length ? (
          <div onClick={handleSendMessage}>
            <SvgMaker name="svgs_filled_send" strokeFill={"#5EA7DE"} />
          </div>
        ) : (
          <>
            <div
              onClick={() => {
                // refBottomSheet.current?.snapToIndex(0);
              }}
            >
              <SvgMaker name="svgs_line_attach" />
            </div>
            <div
              onClick={() => {
                setToggleTypeMessage((prev) =>
                  prev === "voice" ? "video" : "voice"
                );
              }}
              disabled={true}
            >
              {toggleTypeMessage === "voice" ? (
                <SvgMaker name="svgs_line_voice" />
              ) : (
                <SvgMaker name="svgs_line_video_message" />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
