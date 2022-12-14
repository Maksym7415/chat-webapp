import React from "react";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import SvgMaker from "../../../../components/svgMaker";
import Avatars from "../../../../components/avatar/avatars";
import { Paths } from "../../../../routing/config/paths";
// import MenuPaper from "../../../../components/menu/menuPaper";
import {
  headerOptions,
  // headerOptionsChat,
  // headerOptionsGroup,
  // headerOptionsDialog,
  valuesOptions,
} from "./config";
import {
  getUserAvatars,
  // deleteAvatar,
} from "../../../../reduxToolkit/user/requests";
import { actionLogOut } from "../../../../actions/";
import { handleInsertPhotoVideo } from "../../config";
import {
  TYPES_CONVERSATIONS,
  TYPES_FROM_TO_SEARCH_SCREEN,
} from "../../../../config/constants/general";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

// need ts
// rework

const screenWidth = 0;
const Header = ({
  setShowBiggerImg,
  showBiggerImg,
  refBottomSheet,
  setting,
}: any) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const theme: any = useTheme();

  // STYLES
  const classes = useStyles();

  // SELECTORS
  const userAvatars: any = useAppSelector(({ userSlice }) => userSlice.avatars);
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [images, setImages] = React.useState([]);

  // USEEFFECTS
  React.useEffect(() => {
    setting.avatar &&
      !images.length &&
      setImages([{ id: 1, fileName: setting.avatar }]);
  }, [setting.avatar]);

  React.useEffect(() => {
    if (
      JSON.stringify(userAvatars.data) !== JSON.stringify(images) &&
      userAvatars.length &&
      setting.isOwnerProfile
    ) {
      setImages(userAvatars);
    }
  }, [userAvatars]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.containerTop}>
          <IconButton
            onClick={() => {}}
            size="large"
            className={classes.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <Avatars
            avatars={images}
            fullName={setting.conversationName}
            isSquare={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
