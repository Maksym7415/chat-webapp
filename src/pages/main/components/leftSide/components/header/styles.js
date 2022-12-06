import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    padding: "15px 5px",
  },
  containerTop: {
    display: "flex",
    alignItems: "center",
  },
  wrapperTopCenterComponent: {
    display: "flex",
    flex: 1,
  },
  //
  inputSearch: {
    width: "100%",
    maxWidth: 280,
    padding: 0,
    borderRadius: "1.7rem",
    lineHeight: "5px",
    "& > input": {
      padding: "10px 15px",
    },
  },
}));
