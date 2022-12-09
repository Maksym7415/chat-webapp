import React from "react";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import * as config from "./config";
import Header from "./components/header";
import ListMenu from "./components/listMenu";
import ProfileAccount from "./components/profileAccount";
import MainInfo from "./components/mainInfo";
import SvgMaker from "../../components/svgMaker";
import { TYPES_CONVERSATIONS } from "../../config/constants/general";
import { getNameShort } from "../../helpers";
import { useAppSelector } from "../../hooks/redux";
import { IParams } from "../../ts/interfaces/app";

const ProfilePage = ({ typeProfile, conversationData }: any) => {
  // HOOKS
  const params = useParams<IParams>();
  const classes = useStyles();

  // REFS
  const refBottomSheet = React.useRef(null);

  // SELECTORS
  const { lang } = useAppSelector(({ settingSlice }) => settingSlice);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [showBiggerImg, setShowBiggerImg] = React.useState(false);
  const [setting, setSetting] = React.useState<any>({
    nameShort: "",
    avatar: "",
    conversationData: null,
    isOwnerProfile: false,
    typeProfile: TYPES_CONVERSATIONS.dialog,
    conversationName: "",
  });

  // FUNCtIONS
  const fSetShowBiggerImg = (bool) => {
    setShowBiggerImg(bool);
  };

  const route: any = { params: {} };

  // USEEFFECTS
  React.useEffect(() => {
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
      <Header
        setShowBiggerImg={setShowBiggerImg}
        showBiggerImg={showBiggerImg}
        refBottomSheet={refBottomSheet}
        setting={setting}
      />
      <div className={classes.scrollView}>
        <div style={{ flex: 1, position: "relative" }}>
          {setting.isOwnerProfile ? (
            <>
              {!setting.avatar ? (
                <div
                  className={classes.wrapperSetPhoto}
                  onClick={() => config.handleInsertPhotoVideo(refBottomSheet)}
                >
                  <SvgMaker
                    name={"svgs_line_camera_add"}
                    strokeFill={"#4094D0"}
                  />
                  <p className={classes.setPhotoTitle}>Insert photo</p>
                </div>
              ) : null}
              <ProfileAccount avatar={setting.avatar} userInfo={userInfo} />
              <ListMenu
                title={"Settings"}
                list={config.settingsList}
                // onClick={(item) => navigation.navigate(item.path)}
              />
              <ListMenu
                title={"Help"}
                list={config.helpsList}
                onClick={(item) => {}}
              />
              <p className={classes.bottomText}>
                Telegram for Android v7.8.0 (2293) arm64-v8a
              </p>
            </>
          ) : (
            <>
              <MainInfo typeProfile={setting.typeProfile} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
