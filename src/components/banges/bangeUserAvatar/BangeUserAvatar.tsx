import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useStyles, { StyledBadge } from "./styles";

const BangeUserAvatar = ({
  typeBange,
  overlap = "circular",
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  variant = "dot",
  children,
}: any) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes: any = useStyles(theme);

  return (() => {
    switch (typeBange) {
      case "online":
        return (
          <StyledBadge
            overlap={overlap}
            anchorOrigin={anchorOrigin}
            variant={variant}
          >
            {children}
          </StyledBadge>
        );
      case "selected":
        return (
          <div className={classes.selected}>
            {/* <Icon name="checkmark" size={19} color="#ffffff" /> */}
          </div>
        );

      default:
        return <>{children}</>;
    }
  })();
};

export default BangeUserAvatar;
