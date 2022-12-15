import React from "react";
import { makeStyles } from "@mui/styles";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const NotFound = () => {
  // HOOKS
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Error 404</h1>
      <h2>Not found page</h2>
    </div>
  );
};

export default NotFound;
