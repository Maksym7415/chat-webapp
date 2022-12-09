import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import Chat from "../../../chat";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import { useAppSelector } from "../../../../hooks/redux";
import { ILocationParams, IParams } from "../../../../ts/interfaces/app";
import { Paths } from "../../../../routing/config/paths";
import languages from "../../../../config/translations";

// STYLES
const useStyles = makeStyles((theme) => ({
  chooseAChatText: {
    fontSize: 28,
    fontWeight: "500",
  },
}));

const MainContent = () => {
  // HOOKS
  const params = useParams<IParams>();
  const location = useLocation<ILocationParams<any>>();
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <>
      {(() => {
        if (!params?.id && !location.pathname.includes(Paths.newChat)) {
          return (
            <RenderInfoCenterBox>
              <Typography className={classes.chooseAChatText}>
                {languages[lang].mainScreen.chooseAChat}
              </Typography>
            </RenderInfoCenterBox>
          );
        }
        return <Chat />;
      })()}
    </>
  );
};

export default MainContent;
