import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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
import TagFacesIcon from '@material-ui/icons/TagFaces';

import { TransitionProps } from '@material-ui/core/transitions';

import useStyles from './appBar/style/AppWrapperStyles';
import { initializedGlobalSearchAction } from '../redux/search/constants/actionConstants';
import { createNewChatAction } from '../redux/conversations/constants/actionConstants';
import { RootState } from '../redux/reducer';
import { SearchObjectInteface } from '../redux/search/constants/interfaces';

interface ChatProps {
  open: boolean
  handleClose: () => void
}

interface ChipData {
  key: number;
  label: string;
}

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

export default function NewChatScreen({ open, handleClose }: ChatProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const searchResult = useSelector(({ globalSearchReducer }: RootState) => globalSearchReducer.globalSearchResult);

  const [value, setValue] = useState<string>('');
  const [hide, setHide] = useState<boolean>(true);
  const [localSearchResult, setLocalSearchResult] = useState<Array<SearchObjectInteface>>([]);
  const [groupMembers, setGroupMembers] = useState<Array<SearchObjectInteface>>([]);

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

  const handleAdd = (newMember: SearchObjectInteface) => {
    setLocalSearchResult((prevSearchResult) => prevSearchResult.filter((item) => item.id !== newMember.id));
    setGroupMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const handleDelete = (chipToDelete: SearchObjectInteface) => () => {
    setLocalSearchResult((prevSearchResult) => [chipToDelete, ...prevSearchResult]);
    setGroupMembers((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  useEffect(() => {
    let sortGroup: any = [];
    const groupMembersId = groupMembers.map((el) => el.id);
    if (!groupMembers.length) sortGroup = [...searchResult];
    else searchResult.forEach((el) => (groupMembersId.includes(el.id) ? null : sortGroup.push(el)));
    setLocalSearchResult([...sortGroup]);
  }, [searchResult]);

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
            <Button autoFocus color="inherit" onClick={handleClose}>
              Создать чат
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.newChatAddContactWraper}>
          <div className={classes.newChatSearchWrapper}>
            <div className={classes.search} onBlur={blur}>
              <div className={classes.searchIcon} >
                <SearchIcon />
              </div>
              <FormControl fullWidth>
                <Input
                  className={classes.inputRoot}
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
                {localSearchResult.map((result: SearchObjectInteface) => <Paper elevation={2} key={result.id} onClick={() => handleAdd(result)}> <Typography className={classes.searchContent} variant="body1" >{result.firstName}</Typography></Paper>)}
              </Paper>}
            </div>
          </div>
          <div className={classes.chipWrapper}>
            {!!groupMembers.length
              && <Paper component="ul" className={classes.chipRoot}>
                {groupMembers.map((data: SearchObjectInteface) => (
                  <li key={data.id}>
                    <Chip
                      label={data.firstName}
                      onDelete={handleDelete(data)}
                      className={classes.chip}
                    />
                  </li>
                ))}
              </Paper>
            }
          </div>
        </div>
      </Dialog>
    </div>
  );
}
