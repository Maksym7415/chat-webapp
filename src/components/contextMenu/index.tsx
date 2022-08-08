import React from 'react';
import { Paper, MenuList, MenuItem } from '@material-ui/core';

// hooks
import { useAppSelector } from '../../hooks/redux';

export default function ContextMenu() {
  const menuConfig = useAppSelector(({ commonReducer }) => commonReducer.contextMenu);

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
          {menuConfig.config.map((item: any) => <MenuItem key={item.id} onClick={() => item.callback()}>{item.title}</MenuItem>)}
        </MenuList>
      </Paper>
    );
  }

  return null;
}
