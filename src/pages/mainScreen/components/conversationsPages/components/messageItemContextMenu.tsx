import React from 'react';
import { MenuItem } from '@material-ui/core';

export default function MessageContextMenu() {
  return (
    <>
        <MenuItem>Delete Message</MenuItem>
        <MenuItem>Edit Message</MenuItem>
        <MenuItem>Share Message</MenuItem>
    </>
  );
}
