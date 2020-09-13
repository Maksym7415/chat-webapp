/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import { TransitionProps } from '@material-ui/core/transitions';

import useStyles from './appBar/style/AppWrapperStyles';
import { initializedGlobalSearchAction } from '../redux/search/constants/actionConstants';
import { createNewChatAction } from '../redux/conversations/constants/actionConstants';
import { RootState } from '../redux/reducer';
import { SearchObjectInteface } from '../redux/search/constants/interfaces';

import socket from '../socket';
import { fullDate } from '../common/getCorrectDateFormat';

interface ChatProps {
  open: boolean
  handleClose: () => void
  setOpenNewChatScreen: (value: boolean) => void
}

interface Ref {
  [x: string]: any;
}

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function NewChatScreen({ open, handleClose, setOpenNewChatScreen }: ChatProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const searchResult = useSelector(({ globalSearchReducer }: RootState) => globalSearchReducer.globalSearchResult);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);

  const [value, setValue] = useState<string>('');
  const [hide, setHide] = useState<boolean>(true);
  const [localSearchResult, setLocalSearchResult] = useState<Array<SearchObjectInteface>>([]);
  const [groupMembers, setGroupMembers] = useState<Array<SearchObjectInteface>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState<Ref>({});
  const [memberId, setMemberId] = useState(0);
  const [chatName, setChatName] = useState('');

  const chipHandler = (event: any, id: number) => {
    setMemberId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const chipMember = groupMembers.find((el) => el.id === memberId);
    setChecked((prevChecked) => ({ ...prevChecked, [memberId]: { ...chipMember, isAdmin: event.target.checked } }));
    setGroupMembers((prevMember) => prevMember.map((el) => (el.id === memberId ? { ...el, isAdmin: event.target.checked } : el)));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const blur = (event: any) => {
    if (event.currentTarget.contains(event.relatedTarget)) return; // чтобы событие onlur не сработало на родители, при взаимодействии с дочерними элементами
    setHide(true); // убираем элемент с поля видимости
  };

  const handlerSearch = (event: any) => {
    event.persist();
    setValue(event.target.value);
    setHide(false);
    dispatch(initializedGlobalSearchAction(event.target.value));
  };

  const handleAdd = (newMember: SearchObjectInteface) => {
    setLocalSearchResult((prevSearchResult) => prevSearchResult.filter((item) => item.id !== newMember.id));
    setGroupMembers((prevMembers) => {
      const {
        id, isAdmin, firstName, userAvatar, ...otherInfo
      } = newMember;
      return [...prevMembers, {
        isAdmin: false, id, firstName, userAvatar,
      }];
    });
  };

  const handleDelete = (chipToDelete: SearchObjectInteface) => () => {
    setLocalSearchResult((prevSearchResult) => [chipToDelete, ...prevSearchResult]);
    setGroupMembers((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
    setChecked((prevChecked) => {
      delete prevChecked[chipToDelete.id];
      return prevChecked;
    });
  };

  const handleChatNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const createChat = () => {
    if (!groupMembers.length) return;
    socket.emit('chatCreation', [...groupMembers, { id: userId, firstName, isAdmin: true }], fullDate(new Date()), chatName, (success: boolean) => {
      if (success) setOpenNewChatScreen(false);
    });
  };

  useEffect(() => {
    let sortGroup: any = [];
    const groupMembersId = groupMembers.map((el) => el.id);
    if (!groupMembers.length) sortGroup = [...searchResult];
    else searchResult.forEach((el) => (groupMembersId.includes(el.id) ? null : sortGroup.push(el)));
    setLocalSearchResult([...sortGroup]);
  }, [searchResult]);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [hide]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.newChatAppBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.newChatTitle}>
              Новый чат
            </Typography>
            <Button autoFocus color="inherit" onClick={createChat}>
              Создать чат
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container style={{ margin: '12px' }}>
          <Grid item xs={3}>
            <TextField
              id="name"
              label="Введите название группы"
              variant="outlined"
              fullWidth
              required={true}
              size="small"
              onChange={handleChatNameHandler}
            />
          </Grid>
          <Grid item xs={9} className={classes.newChatAddContactWraper}>
            <div className={classes.newChatSearchWrapper}>
              <div className={classes.search} onBlur={blur}>
                <div className={classes.searchIcon} >
                  <SearchIcon />
                </div>
                <FormControl fullWidth>
                  <Input
                    ref={ref}
                    className={classes.inputRoot}
                    placeholder='Выберите контакт'
                    autoComplete='off'
                    disableUnderline={true}
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
                {!!localSearchResult.length && <Paper tabIndex={1} elevation={3} className={clsx(classes.reactSearch, {
                  [classes.hideReactSearch]: hide,
                })}>
                  {localSearchResult.map((result: SearchObjectInteface) => (
                    <Paper
                      elevation={2}
                      key={result.id}
                      onClick={() => handleAdd({ ...result, isAdmin: false })}>
                      <Typography className={classes.searchContent} variant="body1" >{result.firstName}</Typography>
                    </Paper>))}
                </Paper>}
              </div>
            </div>
            <div className={classes.chipWrapper}>
              {!!groupMembers.length
                && <Paper component="ul" className={classes.chipRoot}>
                  {groupMembers.map((data: SearchObjectInteface) => (
                    <li key={data.id} >
                      <Chip
                        style={{ cursor: 'pointer' }}
                        avatar={<Avatar alt="" src={`http://localhost:8081/${data.userAvatar}`} />}
                        label={data.firstName}
                        onDelete={handleDelete(data)}
                        onClick={(event) => chipHandler(event, data.id)}
                        className={classes.chip}
                      />
                    </li>
                  ))}
                </Paper>

              }
              <Popover
                id={'popover'}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography className={classes.popover}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: '#64c8bc' }}
                        checked={checked[memberId] === undefined ? false : checked[memberId].isAdmin}
                        onChange={handleChange}
                      />}
                    label="Администратор"
                  />
                </Typography>
              </Popover>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
