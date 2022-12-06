import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  wrapperList: {
    backgroundColor: "#ffffff",
    // marginTop: 12,
    // paddingTop: 19,
    paddingLeft: 21,
  },
  listTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#4094D0",
  },
  list: {
    marginTop: 9,
  },
  wrapperListItem: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 11,
    paddingBottom: 12,
    alignSelf: "flex-start",
  },
  listItemTitle: {
    marginLeft: 22,
    fontWeight: "400",
    fontSize: 15,
    color: "#202020",
  },
  divider: {
    flexDirection: "row",
    backgroundColor: theme.colors.gray_10,
  },
}));
