import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    backgroundColor: "#ffffff",
  },
  wrapperContacts: {
    padding: "5px",
  },
  wrapperContact: {
    display: "flex",
    alignItems: "center",
    padding: "10px 5px",
    borderRadius: "20px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#dfe7f4",
    },
  },
  wrapperInfo: {
    paddingLeft: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fullName: {
    fontSize: 16,
    margin: 0,
  },
  login: {
    margin: 0,
    marginTop: 3,
    fontSize: 12,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  avatarView: {},
}));
