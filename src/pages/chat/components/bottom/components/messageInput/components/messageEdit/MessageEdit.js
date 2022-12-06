import React from "react";
import makeStyles from "./styles";
import SvgMaker from "../../../../../../../../components/svgMaker";
import languages from "../../../../../../../../config/translations";
import { useAppSelector } from "../../../../../../../../hooks/redux";

export default function MessageEdit({ data, onClose }) {
  //HOOKS

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // STYLES
  const classes = makeStyles();

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
      <div className={classes.close} onClick={onClose}>
        <SvgMaker name={"svgs_filled_cross"} />
      </div>
    </div>
  );
}
