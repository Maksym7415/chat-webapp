import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    position: "relative",
    zIndex: 2,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  containerTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 16px",
    backgroundColor: theme.colors.main,
  },
  wrapperTopCenterComponent: {
    flex: 1,
  },
  wrapperAction: {
    marginLeft: 15,
  },
  wrapperOptions: {},
  imageBackground: {
    zIndex: 101,
    height: "100%",
  },
  content: {
    position: "relative",
  },
  wrapperAvatarAndInfo: {
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  avatar: {},
  info: {
    marginLeft: 20,
  },
  userName: {
    fontWeight: "500",
    fontSize: 20,
    color: "#FFFFFF",
  },
  status: {
    fontWeight: "400",
    fontSize: 16,
    color: "#FFFFFF",
  },
  wrapperSetPhoto: {
    backgroundColor: "#FFFFFF",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -30,
    right: 20,
    shadowOffset: { width: 0, height: 1.07547 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3.22641,
  },
  imageContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
    resizeMode: "contain",
  },
  paginationContainerStyle: {
    padding: "0",
    position: "absolute",
    top: 20,
    alignSelf: "center",
  },
  dotsOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "7px 10px",
  },
  wrapperIconOption: {
    marginRight: 10,
  },
}));
