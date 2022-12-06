import React, { useState, useRef, useEffect } from "react";
import { History } from "history";
import clsx from "clsx";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { showDialogAction } from "../../redux/common/commonActions";
import { initializedGlobalSearchAction } from "../../redux/search/constants/actionConstants";
import { createNewChatAction } from "../../redux/conversations/constants/actionConstants";
import Drawer from "../Drawer";
// import AppBarMenu from "./AppBarMenu";
import useStyles from "./style/AppWrapperStyles";
import DefaultAvatar from "../defaultAvatar";
import { useDebounce } from "../../hooks/useDebounce";
import { Paths } from "../../routing/config/paths";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface IProps<H> {
  children: Record<string, unknown>;
  history: H;
}
interface IElements {
  title: string;
}

interface Ref {
  [x: string]: any;
}

// maybe needed (08.08)
// interface ParamsId{
//   id: string
// }

// rework

export default function MiniDrawer(props: IProps<History>) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // maybe needed (08.08)
  // const params = useParams<any>();

  // REFS
  const ref = useRef<Ref>({});

  // SELECTORS
  // const searchResult = useAppSelector(({ globalSearchReducer }) => globalSearchReducer.globalSearchResult);
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  // const userData = useAppSelector(({ userReducer }) => userReducer.userInfo.success.data);
  // const { userId } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);

  // STATES
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Element | null>(
    null
  );
  const [searchvalue, setSearchValue] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce<string>(searchvalue, 500);

  // FUNCTIONS
  const handleOpenProfile = () => {
    dispatch(showDialogAction("Profile"));
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const blur = (event: any) => {
    if (event.currentTarget.contains(event.relatedTarget)) return; // чтобы событие onlur не сработало на родители, при взаимодействии с дочерними элементами
    setHide(true); // убираем элемент с поля видимости
  };

  const handlerSearch = (event: any) => {
    event.persist();
    setSearchValue(event.target.value);
    // if (!event.target.value) return setReactSearch([]);
    setHide(false);
    // setReactSearch(() => top100Films.filter((el) => el.title.slice(0, event.target.value.length).toLowerCase() === event.target.value.toLowerCase()));
  };

  // const createNewChat = (id: number, fullName: string) => {
  //   dispatch(createNewChatAction({ userId, opponentId: id }));
  //   setHide(true);
  //   const chat = conversationsList.find((el) => el.conversationName === fullName);
  //   if (chat) {
  //     return props.history.push(`${Paths.chat}/${chat.conversationId}`);
  //   }
  //   props.history.push(Paths.newchat);
  // };

  // USEEFFECTS
  useEffect(() => {
    ref.current && ref.current.focus(); // Если элемент виден на экране даем ему фокус
  }, [hide]);

  useEffect(() => {
    !hide && dispatch(initializedGlobalSearchAction(debouncedSearchValue));
  }, [debouncedSearchValue]);

  return (
    <div className={classes.root}>
      <>
        <AppBar
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: openDrawer,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.searchWrapper}>
              <div className={classes.search} onBlur={blur}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <FormControl fullWidth>
                  <Input
                    className={classes.inputRoot}
                    autoComplete="off"
                    disableUnderline={true}
                    ref={ref}
                    id="standard-adornment-weight"
                    value={searchvalue}
                    onChange={handlerSearch}
                    // onFocus={() => {
                    //   if (searchResult.length) return setHide(false);
                    // }}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />
                </FormControl>
                {/* {!!searchResult.length && <Paper tabIndex={1} elevation={3} className={clsx(classes.reactSearch, {
                  [classes.hideReactSearch]: hide,
                })}>
                  {searchResult.map((result) => <Paper elevation={2} key={result.id} onClick={() => createNewChat(result.id, result.fullName)}> <Typography className={classes.searchContent} variant="body1" >{result.firstName}</Typography></Paper>)}
                </Paper>} */}
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={17}
                  color="secondary"
                  overlap="rectangular"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={"primary-search-account-menu"}
                aria-haspopup="true"
                onClick={handleOpenProfile}
                color="inherit"
              >
                {/* {userData.userAvatar ? <Avatar alt="" src={`${process.env.REACT_APP_BASE_URL}/${userData.userAvatar}`} /> : <DefaultAvatar name={`${userData.firstName} ${userData.lastName}`} width='40px' height='40px' fontSize='1.1rem' />} */}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={"primary-search-mobile-account-menu"}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        {/* <AppBarMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          setMobileMoreAnchorEl={setMobileMoreAnchorEl}
          userAvatar={userData.userAvatar}
          userData={userData}
          openProfile={handleOpenProfile}
        /> */}
      </>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {props.children}
      </main>
    </div>
  );
}
