/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useRef, useEffect } from 'react';
import { History } from 'history';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { showDialogAction } from '../../redux/common/commonActions';
// import { initializedGlobalSearchAction } from '../../redux/search/constants/actionConstants';
import { createNewChatAction } from '../../redux/conversations/constants/actionConstants';
import Drawer from '../Drawer';
import AppBarMenu from './AppBarMenu';
import useStyles from './style/AppWrapperStyles';
import DefaultAvatar from '../defaultAvatar';
import { useDebounce } from '../../hooks/useDebounce';
import { Paths } from '../../routing/config/paths';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface IProps<H> {
  children: Record<string, unknown>
  history: H
}
interface IElements {
  title: string
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
  const searchResult = useAppSelector(({ globalSearchReducer }) => globalSearchReducer.globalSearchResult);
  const conversationsList = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationsList.success.data);
  const userData = useAppSelector(({ userReducer }) => userReducer.userInfo.success.data);
  const { userId } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);

  // STATES
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Element | null>(null);
  const [searchvalue, setSearchValue] = useState<string>('');
  const [hide, setHide] = useState<boolean>(true);

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce<string>(searchvalue, 500);

  // FUNCTIONS
  const handleOpenProfile = (event: any) => {
    dispatch(showDialogAction('Profile'));
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

  const createNewChat = (id: number, fullName: string) => {
    dispatch(createNewChatAction({ userId, opponentId: id }));
    setHide(true);
    const chat = conversationsList.find((el) => el.conversationName === fullName);
    if (chat) {
      return props.history.push(`${Paths.chat}/${chat.conversationId}`);
    }
    props.history.push(Paths.newchat);
  };

  // USEEFFECTS
  useEffect(() => {
    ref.current && ref.current.focus(); // Если элемент виден на экране даем ему фокус
  }, [hide]);

  // useEffect(() => {
  //   dispatch(initializedGlobalSearchAction(debouncedSearchValue));
  // }, [debouncedSearchValue]);

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
                <div className={classes.searchIcon} >
                  <SearchIcon />
                </div>
                <FormControl fullWidth>
                  <Input
                    className={classes.inputRoot}
                    autoComplete='off'
                    disableUnderline={true}
                    ref={ref}
                    id="standard-adornment-weight"
                    value={searchvalue}
                    onChange={handlerSearch}
                    onFocus={() => {
                      if (searchResult.length) return setHide(false);
                    }}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>
                {!!searchResult.length && <Paper tabIndex={1} elevation={3} className={clsx(classes.reactSearch, {
                  [classes.hideReactSearch]: hide,
                })}>
                  {searchResult.map((result) => <Paper elevation={2} key={result.id} onClick={() => createNewChat(result.id, result.fullName)}> <Typography className={classes.searchContent} variant="body1" >{result.firstName}</Typography></Paper>)}
                </Paper>}
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={'primary-search-account-menu'}
                aria-haspopup="true"
                onClick={handleOpenProfile}
                color="inherit"
              >
                {userData.userAvatar ? <Avatar alt="" src={`${process.env.REACT_APP_BASE_URL}/${userData.userAvatar}`} /> : <DefaultAvatar name={`${userData.firstName} ${userData.lastName}`} width='40px' height='40px' fontSize='1.1rem' />}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={'primary-search-mobile-account-menu'}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
        <AppBarMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          mobileMoreAnchorEl={mobileMoreAnchorEl}
          setMobileMoreAnchorEl={setMobileMoreAnchorEl}
          userAvatar={userData.userAvatar}
          userData={userData}
          openProfile={handleOpenProfile}
        />
      </>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {props.children}
      </main>
    </div>
  );
}
