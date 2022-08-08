import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, MenuList, MenuItem } from '@material-ui/core';

import { RootState } from '../../redux/reducer';

export default function ContextMenu() {
  const menuConfig = useSelector(({ commonReducer }: RootState) => commonReducer.contextMenu);

  if (menuConfig.isShowMenu) {
    return (
      <Paper
        style={{
          zIndex: 1000,
          top: menuConfig.yPos,
          left: menuConfig.xPos,
          position: 'absolute',
        }}
      >
        <MenuList>
          {menuConfig.config.map((item) => <MenuItem key={item.id} onClick={() => item.callback()}>{item.title}</MenuItem>)}
        </MenuList>
      </Paper>
    );
  }

  return null;
}
