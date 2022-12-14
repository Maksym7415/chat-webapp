import * as React from "react";
import SvgMaker from "../../../svgMaker";
import useStyles from "./styles";

const TemplatesContent = ({ type }) => {
  // HOOKS
  const classes = useStyles();

  return (() => {
    switch (type) {
      case "copy":
        return (
          <div className={classes.copyWrapper}>
            <SvgMaker name={"svgs_line_copy"} />
            <p className={classes.copyText}>Copy successfully</p>
          </div>
        );
      default:
        break;
    }
  })();
};

export default TemplatesContent;
