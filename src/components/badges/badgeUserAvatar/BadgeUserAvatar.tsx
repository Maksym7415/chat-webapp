import * as React from "react";
import { StyledBadge } from "./styles";

// need ts

const BadgeUserAvatar = ({
  typeBadge,
  overlap = "circular",
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  variant = "dot",
  sizeBadge = 18,
  children,
}: any) => {
  return (() => {
    switch (typeBadge) {
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
          <div>{/* <Icon name="checkmark" size={19} color="#ffffff" /> */}</div>
        );

      default:
        return <>{children}</>;
    }
  })();
};

export default BadgeUserAvatar;
