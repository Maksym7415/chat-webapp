import { makeStyles } from "@mui/styles";

const flexEnd = {
  display: "flex",
  // justifyContent: "flex-end",
};

export default makeStyles((theme) => ({
  wrapper: {
    padding: "0",
    marginHorizontal: 0,
  },
  wrapperUp: {
    display: "flex",
    position: "relative",
    padding: "5px 10px",
  },
  containerShared: {
    ...flexEnd,
  },
  containerSender: {
    ...flexEnd,
  },
  containerFriend: {
    ...flexEnd,
  },

  paperSharedMessage: {
    // backgroundColor: theme.colors.gray_2,
    padding: "10px",
    maxWidth: 600,
    borderRadius: 10,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  wrapperTextMessageShared: {
    position: "relative",
    padding: "0 10px",
    marginVertical: 10,

    flexDirection: "row",
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
    marginTop: 5,
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
}));
