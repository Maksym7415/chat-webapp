import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import SvgMaker from "../../../../../../../../components/svgMaker";
import languages from "../../../../../../../../config/translations";
import { useAppSelector } from "../../../../../../../../hooks/redux";

// need ts

const MessageEdit = ({ data, onClose }: any) => {
  //HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <div className={classes.root}>
      <div className={classes.wrapperIconEdit}>
        <SvgMaker name={"svgs_filled_pencil"} />
      </div>
      <div className={classes.wrapperMainContent}>
        <p>{languages[lang].generals.editMessage}</p>
        <p className="conversations__edit-message-paragraph">
          {data.message.message}
        </p>
      </div>
      <div className={classes.close}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageEdit;
