/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { initializedGlobalSearchAction } from '../../redux/search/constants/actionConstants';
import { createNewChatAction } from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';

import Drawer from '../Drawer';
import AppBarMenu from './AppBarMenu';
import useStyles from './style/AppWrapperStyles';

interface IProps {
  children: Record<string, unknown>
}
interface IElements {
  title: string
}

interface Ref {
  [x: string]: any;
}

export default function MiniDrawer(props: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchResult = useSelector(({ globalSearchReducer }: RootState) => globalSearchReducer.globalSearchResult);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<Element | null>(null);
  const [reactSearch, setReactSearch] = useState<IElements[]>([]);
  const [value, setValue] = useState<string>('');
  const [hide, setHide] = useState<boolean>(true);
  const ref = useRef<Ref>({});

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
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
    setValue(event.target.value);
    // if (!event.target.value) return setReactSearch([]);
    setHide(false);
    dispatch(initializedGlobalSearchAction(event.target.value));
    // setReactSearch(() => top100Films.filter((el) => el.title.slice(0, event.target.value.length).toLowerCase() === event.target.value.toLowerCase()));
  };

  const createNewChat = (id: number) => {
    dispatch(createNewChatAction({ userId, opponentId: id }));
    setHide(true);
  };

  useEffect(() => {
    ref.current && ref.current.focus(); // Если элемент виден на экране даем ему фокус
  }, [hide]);

  return (
    <div className={classes.root}>
      <>
        <AppBar
          position="fixed"
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
                    value={value}
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
                  {searchResult.map((result) => <Paper elevation={2} key={result.id} onClick={() => createNewChat(result.fkUserId)}> <Typography className={classes.searchContent} variant="body1" >{result.pseudonyme}</Typography></Paper>)}
                </Paper>}
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
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
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
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
        />
      </>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
