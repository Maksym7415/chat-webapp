import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./styles";
import Avatars from "../../../../components/avatar/avatars";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

// need ts
// rework avatars

const Header = ({ setting }: any) => {
  // HOOKS
  const dispatch = useAppDispatch();

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
