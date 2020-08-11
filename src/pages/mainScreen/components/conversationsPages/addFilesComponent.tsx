/* eslint-disable no-param-reassign */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { fullDate } from '../../../../common/getCorrectDateFormat';
import { RootState } from '../../../../redux/reducer';

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

let count = 0;

const func = async (fileReader: any, blob: any, userId: number, conversationId: number, fileSize: number) => new Promise((resolve) => {
  fileReader.readAsArrayBuffer(blob);
  fileReader.onloadend = () => {
    let arrayBuffer = fileReader.result;
    socket.emit('files', {
      data: arrayBuffer,
      sendDate: fullDate(new Date()),
      messageType: 'file',
      fkSenderId: userId,
      conversationId,
      fileSize,
    });
    resolve();
  };
});

export default function AddFiles() {
  const classes = useStyles();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files).map((el: any) => el.slice(0, 10000));
      console.log(filesArray);
      const foo = async () => {
        if (count === filesArray.length) {
          count = 0;
        } else {
          await func(fileReader, filesArray[count], userId, conversationId, filesArray[count].size);
          count++;
          foo();
        }
      };
      foo();
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
