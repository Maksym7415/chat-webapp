import React from "react";
import { useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import useStyles from "./styles";
// import Loader from "../loader";

const RenderConditionsList = ({
  list = [],
  isLoading = false,
  noResultsText = "No results",
  styles = {
    boxCenter: {},
    noResults: {},
  },
  seettingLoader = {},
}) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);

  // RENDER CONDITIONS
  if (isLoading) {
    return (
      <div className={classes.boxCenter} style={styles?.boxCenter}>
        <CircularProgress size={50} />
        {/* <Loader color={theme.colors.main} size={50} {...seettingLoader} /> */}
      </div>
    );
  }

  if (!list.length) {
    return (
      <div className={classes.boxCenter} style={styles?.boxCenter}>
        <p className={classes.noResults} style={styles?.noResults}>
          {noResultsText}
        </p>
      </div>
    );
  }
};

export default RenderConditionsList;
