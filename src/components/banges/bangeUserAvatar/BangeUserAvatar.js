import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Badge } from "@mui/material";
import useStyles from "./styles";

const BangeUserAvatar = ({ typeBange, sizeBadge, styles }) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);

  return (() => {
    switch (typeBange) {
      case "online":
        return (
          <Badge
            size={sizeBadge || 18}
            className={classes.badge}
            style={{ ...styles?.badge }}
          />
        );
      case "selected":
        return (
          <div className={classes.selected}>
            {/* <Icon name="checkmark" size={19} color="#ffffff" /> */}
          </div>
        );

      default:
        return <></>;
    }
  })();
};

export default BangeUserAvatar;
