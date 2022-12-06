import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "16px",
  },
  top: {
    flexDirection: "row",
  },
  containerTop: {
    display: "flex",
    alignItems: "center",
  },
  back: {
    marginRight: 30,
  },
  wrapperConversationData: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  wrapperAvatar: {
    marginRight: 10,
    cursor: "pointer",
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
    margin: 0,
    // color
    // color: "#ffffff",
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 14,
    // color
    // color: "#D2E9FB",
  },
  selectedMessagesAmountContainer: {
    backgroundColor: "#ffffff",
  },
  wrapperClose: {
    marginRight: 20,
  },
  wrpperSelectedAmount: { flex: 1 },
  wrapperActions: {
    flexDirection: "row",
  },
  wrapperAction: {
    marginLeft: 20,
  },
  wrapperOptions: {
    marginRight: 0,
  },
  dotsOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: "7px 10px",
    // flex: 1,
    width: "100%",
    position: "relative",
  },
  wrapperIconOption: {
    marginRight: 10,
  },
  options: {
    // position: 'absolute',
    right: 0,
  },
  wrapperArrowRight: {
    position: "absolute",
    right: 10,
  },
  arrowRight: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
}));
