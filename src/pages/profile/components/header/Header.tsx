import React from "react";
import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import SvgMaker from "../../../../components/svgMaker";
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

  // REFS
  const carouselRef = React.useRef(null);

  // SELECTORS
  const { avatars: userAvatars }: any = useAppSelector(
    ({ userSlice }) => userSlice
  );
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  // STATES
  const [images, setImages] = React.useState([]);
  const [indexSelected, setIndexSelected] = React.useState(0);
  const [visibleOptions, setVisibleOptions] = React.useState(false);

  // VARIABLES
  const sizeAvatar = 59;

  // FUNCTIONS
  const onSelect = (indexSelected) => {
    setIndexSelected(indexSelected);
  };

  const handleOptions = (value, noFunctional) => {
    setVisibleOptions(false);

    switch (value) {
      case valuesOptions.insertPhotoVideo:
        return handleInsertPhotoVideo(refBottomSheet);
      case valuesOptions.edit:
        // return navigation.navigate(Paths.editNameInSubProfile);
        return;
      // case valuesOptions.removePhoto:
      //   dispatch(
      //     deleteAvatar({
      //       params: {
      //         id: images[indexSelected].id,
      //       },
      //       cb: () => dispatch(getUserAvatars({})),
      //     })
      //   );
      //   return;
      case valuesOptions.logout:
        return dispatch(actionLogOut());
      default:
        break;
    }
  };

  const onToSearch = () => {
    // navigation.navigate(Paths.search, {
    //   from: TYPES_FROM_TO_SEARCH_SCREEN.profile,
    // });
  };

  const selectOptions = (typeProfile, isOwnerProfile) => {
    if (isOwnerProfile) {
      return headerOptions(lang);
    }

    switch (typeProfile) {
      // case TYPES_CONVERSATIONS.dialog:
      //   return headerOptionsDialog(lang);
      // case TYPES_CONVERSATIONS.chat:
      //   return headerOptionsChat(lang);
      // case TYPES_CONVERSATIONS.group:
      //   return headerOptionsGroup(lang);
      default:
        return [];
    }
  };

  // USEEFFECTS
  // React.useEffect(() =>
  //   React.useCallback(() => {
  //     if (setting.isOwnerProfile && !userAvatars.length) {
  //       dispatch(getUserAvatars({}));
  //     }
  //   }, [setting.isOwnerProfile])
  // );

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

  React.useEffect(() => {
    showBiggerImg && indexSelected !== 0 && setIndexSelected(0);
  }, [showBiggerImg]);

  // RENDERS
  const renderItem = ({ item }) => {
    return (
      <></>
      // <ImageBackground
      //   source={{ uri: `${process.env.REACT_APP_BASE_URL}/${item.fileName}` }}
      //   className={classes.imageContainer}
      // >
      //   <div className={{ ...classes.info, marginLeft: 0 }}>
      //     <p className={{ ...classes.userName, fontSize: 26, marginBottom: 10 }}>
      //       {setting.conversationName}
      //     </p>
      //     <p className={classes.status}>online*</p>
      //   </div>
      // </ImageBackground>
    );
  };

  const renderIconAction = () => {
    if (
      [TYPES_CONVERSATIONS.group, TYPES_CONVERSATIONS.chat].includes(
        setting.typeProfile
      )
    ) {
      return <></>;
    }
    return setting.avatar ? (
      <div
        className={classes.wrapperSetPhoto}
        onClick={() => {
          // setting.isOwnerProfile
          //   ? handleInsertPhotoVideo(refBottomSheet)
          //   : navigation.goBack();
        }}
      >
        {setting.isOwnerProfile ? (
          <SvgMaker name={"svgs_line_camera_add"} />
        ) : (
          <SvgMaker name={"svgs_line_chat_2"} />
        )}
      </div>
    ) : null;
  };

  const renderTopHeaderIconAction = (typeProfile, isOwnerProfile) => {
    if (isOwnerProfile) {
      return (
        <>
          {/* <div
            className={classes.wrapperAction}
            onClick={() => Alert.alert('Цього функціоналу наразі немає')}
            disabled={true}>
            <SvgMaker name={'svgs_line_qr_code'} strokeFill={'#ffffff'} />
          </div> */}
          <div className={classes.wrapperAction} onClick={onToSearch}>
            <SvgMaker name={"svgs_line_search"} strokeFill={"#ffffff"} />
          </div>
        </>
      );
    }

    switch (typeProfile) {
      case TYPES_CONVERSATIONS.dialog:
        return (
          <>
            <div className={classes.wrapperAction}>
              <SvgMaker
                name={"svgs_filled_video_call"}
                strokeFill={"#ffffff"}
              />
            </div>
            <div className={classes.wrapperAction}>
              <SvgMaker name={"svgs_filled_phone"} strokeFill={"#ffffff"} />
            </div>
          </>
        );
      case TYPES_CONVERSATIONS.chat:
        return (
          <div className={classes.wrapperAction}>
            <SvgMaker name={"svgs_filled_pencil"} strokeFill={"#ffffff"} />
          </div>
        );
      case TYPES_CONVERSATIONS.group:
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.containerTop}>
          <div
            onClick={() => {
              // if (setting.isOwnerProfile) {
              //   navigation.navigate(Paths.main);
              // } else {
              //   navigation.navigate(Paths.chat, {
              //     id: setting.conversationData.conversationId,
              //     conversationData: setting.conversationData,
              //   });
              // }
            }}
          >
            <SvgMaker name="svgs_filled_back_arrow" strokeFill={"#ffffff"} />
          </div>
          <div className={classes.wrapperTopCenterComponent} />
          <>
            {renderTopHeaderIconAction(
              setting.typeProfile,
              setting.isOwnerProfile
            )}
            <div
              className={clsx(classes.wrapperAction, classes.wrapperOptions)}
            >
              {/* <MenuPaper
                setShowMenu={setVisibleOptions}
                showMenu={visibleOptions}
                anchor={{ strokeFill: "#ffffff" }}
              >
                {selectOptions(setting.typeProfile, setting.isOwnerProfile)
                  ?.filter((item) => {
                    if (item.show === 1) {
                      return true;
                    }
                    return showBiggerImg ? item.show === 2 : item.show === 3;
                  })
                  ?.map((action) => {
                    return (
                      <div
                        key={action.id}
                        className={classes.dotsOption}
                        onClick={() =>
                          handleOptions(action.value, action.noFunctional)
                        }
                      >
                        {action.icon.name && (
                          <div className={classes.wrapperIconOption}>
                            <SvgMaker name={action.icon.name} />
                          </div>
                        )}
                        <p>{action.title}</p>
                      </div>
                    );
                  })}
              </MenuPaper> */}
            </div>
          </>
        </div>
        <div
          className={classes.content}
          style={{
            padding: showBiggerImg ? 0 : "0 16px",
            height: showBiggerImg ? screenWidth || 50 : 100,
            backgroundColor: showBiggerImg ? "transparent" : theme.colors.main,
          }}
        >
          <div style={{ flex: 1 }}>
            {/* <Carousel
                ref={carouselRef}
                layout="default"
                sliderWidth={screenWidth}
                activeDotIndex={indexSelected}
                itemWidth={screenWidth}
                data={images}
                renderItem={renderItem}
                onSnapToItem={(index) => onSelect(index)}
                inactiveSlideScale={1}
              />
              <Pagination
                inactiveDotColor="#3f0f08"
                dotColor={theme.colors.main}
                activeDotIndex={indexSelected}
                dotsLength={images.length}
                animatedDuration={150}
                inactiveDotScale={1}
                containerStyle={classes.paginationContainerStyle}
              /> */}
          </div>
        </div>
      </div>
      {renderIconAction()}
    </div>
  );
};

export default Header;
