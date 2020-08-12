/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { RootState } from '../../../../redux/reducer';
import { handleGetBufferFile, handleEmitFilePartly } from '../../helpers/addFiles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

let filesCount = 0;

export default function AddFiles() {
  const classes = useStyles();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files);
      const handleSendFile = async () => {
        if (filesCount === filesArray.length) {
          filesCount = 0;
        } else {
          const file = await handleGetBufferFile(fileReader, filesArray[filesCount]);
          handleEmitFilePartly(file, filesArray[filesCount].size, filesArray[filesCount].name, userId, conversationId, socket);
          // eslint-disable-next-line no-plusplus
          filesCount++;
          handleSendFile();
        }
      };
      handleSendFile();
    }
  };
  return (
    <>
      <input accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        multiple
        onChange={addFiles}
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
    </>
  );
}
