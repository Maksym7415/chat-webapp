import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: "0 10px",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    backgroundColor: "#ffffff",
  },
  wrapperAction: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  title: {
    paddingLeft: 5,
  },
  hide: {
    opacity: 0,
  },
}));
