import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  wrapperMessages: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "10px 0 5px",
    // display: "flex",
    // justifyContent: "center",
    // maxWidth: 800,
    // width: "100%",
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
  infiniteScroll: {
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse",
  },
}));
