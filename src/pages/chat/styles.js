import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    flex: 1,
    height: "100vh",
  },
  wrapperMessages: {
    overflowY: "auto",
    // flex: 1,
    // display: "flex",
  },
  wrapperSendData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  sendDataText: {
    maxWidth: 125,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "7px 1px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#fffefeb5",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
  },
  wrapperLoader: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));
