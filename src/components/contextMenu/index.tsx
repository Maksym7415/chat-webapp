import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Paper, MenuList } from '@material-ui/core';
import { ContextMenuProps } from './interfaces';
import { RootState } from '../../redux/reducer';

export default function ContextMenu() {
  const menuConfig = useSelector(({ commonReducer }: RootState) => commonReducer.contextMenu);

  console.log(menuConfig.yPos, menuConfig.xPos);

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
          {menuConfig.component && menuConfig.component()}
        </MenuList>
      </Paper>
    );
  }

  return null;
}
