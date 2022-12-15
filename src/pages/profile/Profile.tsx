import React from "react";
import useStyles from "./styles";
import Header from "./components/header";
import MainInfo from "./components/mainInfo";
import { TYPES_CONVERSATIONS } from "../../config/constants/general";
import { getNameShort } from "../../helpers";
import { useAppSelector } from "../../hooks/redux";

const ProfilePage = ({ typeProfile, conversationData }: any) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [setting, setSetting] = React.useState<any>({
    nameShort: "",
    avatar: "",
    conversationData: null,
    isOwnerProfile: false,
    typeProfile: TYPES_CONVERSATIONS.dialog,
    conversationName: "",
  });

  // USEEFFECTS
  React.useLayoutEffect(() => {
    let settingLocal = {
      typeProfile: typeProfile?.toLowerCase() || TYPES_CONVERSATIONS.dialog,
      nameShort: getNameShort(conversationData?.conversationName),
      conversationData: conversationData || null,
      avatar: conversationData?.conversationAvatar || "",
      conversationName: conversationData?.conversationName,
      isOwnerProfile: false,
    };

    setSetting((prev) => ({
      ...prev,
      ...settingLocal,
    }));
  }, [userInfo]);

  return (
    <div className={classes.container}>
      <Header setting={setting} />
      <div className={classes.scrollView}>
        <MainInfo typeProfile={setting.typeProfile} />
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
