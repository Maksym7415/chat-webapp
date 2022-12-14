import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "grid",
    columnGap: "5px",
    margin: "5px 10px",
  },
  wrapper: {
    padding: "0",
  },
  wrapperUp: {
    display: "flex",
    position: "relative",
    // margin: "0 5px",
  },

  paperSharedMessage: {
    backgroundColor: "#d6f6e3",
    padding: "10px",
    maxWidth: 600,
    borderRadius: 10,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  wrapperTextMessageShared: {
    position: "relative",
    padding: "0 10px",
    marginTop: 10,
  },
  paperSenderMessage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    backgroundColor: theme.colors.green_light1,
    padding: "15px",
    marginLeft: 40,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "flex-end",
  },
  edited: {
    textAlign: "right",
    // padding: 0,
    // margin: 0,
    fontSize: 9,
  },
  paperFriendMessage: {
    position: "relative",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    // alignSelf: "flex-start",
    backgroundColor: theme.colors.white1,
    borderRadius: 10,
    overflow: "hidden",
  },
  wrapperName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapperDate: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  name: {
    color: "#000000",
  },
  messageSendTime: {
    color: "#000000",
  },
  messageText: {
    color: "#000000",
    overflow: "hidden",
    wordBreak: "keep-all",
  },
  wrapperMessageUserName: {
    color: "#000000",
    fontWeight: "600",
  },
  selectedMessages: {
    backgroundColor: "rgba(132, 202, 254, 0.2)",
  },
  divider: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "green",
    width: 3,
    height: "100%",
  },

  wrapperFile: {
    // backgroundColor: 'red',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  messageSelectControl: {
    display: "flex",
    alignSelf: "flex-end",
    border: "2px solid #ffffff",
    borderRadius: "50%",
  },
  messageSelected: {
    backgroundColor: "#00C73E",
    padding: 2,
    "&:hover": {
      backgroundColor: "#00C73E",
    },
  },
  messageSelectedIcon: {
    width: 18,
    height: 18,
    color: "#ffffff",
  },
}));
