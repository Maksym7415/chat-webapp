import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles/styles';

interface IProps {
  settingWrapper?: {
    style?: React.CSSProperties,
    className?: string,
  },
  settingWrapperIcon: {
    style?: React.CSSProperties,
    color?: any,
    ariaLabel?: string,
    className?: string,
    onClick?: () => void,
    component?: any
  }
}

export default function DeleteItem({
  settingWrapper, settingWrapperIcon,
}: IProps) {
  // HOOKS
  const classes = useStyles();

  return (
    <div className={settingWrapper?.className || classes.deleteFileWrapper} style={settingWrapper?.style}>
        <IconButton
          color={settingWrapperIcon?.color || 'primary'}
          aria-label={settingWrapperIcon.ariaLabel}
          component={settingWrapperIcon.component || 'span'}
          className={settingWrapperIcon.className || classes.deleteFile}
          onClick={settingWrapperIcon.onClick}
        >
          <DeleteIcon />
        </IconButton>
    </div>
  );
}