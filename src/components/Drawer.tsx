import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import {
  Drawer, ListItemIcon, ListItemText, List, ListItem,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import listRenderByRole from './drawerList';
import { showDialogAction } from '../redux/common/commonActions';
import { Paths } from '../routing/config/paths';

import NewChatScreen from './newChat/newChatScreen';

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

const notLinkItemsRoute = [Paths.signIn];

export default function MiniDrawer({ openDrawer, setOpenDrawer }: IDrawerProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpenNewChatScreen] = React.useState(false);

  const handleDrawerClose = (title: string, route: string) => {
    setOpenDrawer(false);
    if (title === 'New Chat') {
      dispatch(showDialogAction('Add New Chat'));
    } else if (title === 'Logout') {
      dispatch(actionLogout());
      history.push(Paths.signIn);
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
            }) => {
              const bodyItem = <ListItem button>
                                  <ListItemIcon>{icon}</ListItemIcon>
                                  <ListItemText primary={title} />
                                </ListItem>;

              return notLinkItemsRoute.includes(route)
                ? <div style={{ textDecoration: 'none' }} key={id} onClick={() => handleDrawerClose(title, route)}>
                    {bodyItem}
                  </div>
                : <Link to={route} style={{ textDecoration: 'none' }} key={id} onClick={() => handleDrawerClose(title, route)}>
                    {bodyItem}
                  </Link>;
            })}
          </List>
        </div>
      </Drawer>
      {/* <NewChatScreen open={open} handleClose={handleClose} setOpenNewChatScreen={setOpenNewChatScreen} /> */}
    </>
  );
}
