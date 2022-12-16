import React from "react";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SvgMaker from "../../../../../../../components/svgMaker";

const useStyles = makeStyles((theme) => ({
  emojis: {
    paddingLeft: 13,
    backgroundColor: "#ffffff",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const LeftInputComponent = () => {
  // HOOKS
  const classesLocal = useStyles();

  return (
    <>
      <IconButton className={classesLocal.emojis} disabled={true}>
        <SvgMaker name="svgs_line_emoji" />
      </IconButton>
    </>
  );
};

export default LeftInputComponent;