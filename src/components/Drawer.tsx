import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import listRenderByRole from './drawerList';

import NewChatScreen from './newChatScreen';

import { actionLogout } from '../redux/authorization/constants/actionConstants';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 150,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  },
}));

interface IDrawerProps {
  openDrawer: boolean
  setOpenDrawer: (value: boolean) => void
}

export default function MiniDrawer({ openDrawer, setOpenDrawer }: IDrawerProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpenNewChatScreen] = React.useState(false);

  const handleClose = () => {
    setOpenNewChatScreen(false);
  };

  const handleDrawerClose = (title: string) => {
    setOpenDrawer(false);
    if (title === 'New Chat') {
      setOpenNewChatScreen(true);
    } else if (title === 'Logout') {
      dispatch(actionLogout());
    }
  };

  return (
    <>

      <Drawer anchor={'left'} open={openDrawer} onClose={handleDrawerClose}>
        <div
          className={classes.list}
          role="presentation"
        >
          <List>
            {listRenderByRole().map(({
              icon, id, title, route,
            }) => (
                <Link to={route} style={{ textDecoration: 'none' }} key={id} onClick={() => handleDrawerClose(title)}>
                  <ListItem button>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
            ))}
          </List>
        </div>
      </Drawer>
      <NewChatScreen open={open} handleClose={handleClose} setOpenNewChatScreen={setOpenNewChatScreen} />
    </>
  );
}
