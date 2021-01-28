/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fullDate } from '../../../common/getCorrectDateFormat';
import { socket, sendMessage } from '../../../socket';
import { RootState } from '../../../redux/reducer';
import { handleGetBufferFile } from '../../mainScreen/helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps, FilesSrc } from '../../mainScreen/interfaces';

let filesCount = 0;

export default function AddFiles({
  files, isOpen, handleOpenDialog, handleAddFile,
}: AddFilesProps) {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<FilesSrc | object>({});

  return (
    <>
      <UploadDialog isOpen={isOpen} handleClose={handleOpenDialog} files={files} handleAddFile={handleAddFile} message={message} src={src} setSrc={setSrc} setMessage={setMessage} />
    </>
  );
}
