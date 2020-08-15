import React, { useRef, useState, useEffect } from 'react';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import { useDispatch } from 'react-redux';
import { Chip } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
// import { showMessage } from '../../redux/theme/constants/actionConstants';
// import { dropZoneAction } from '../../redux/syncStore/constants/actionConstants';
import useStyles from './styles';
import { DynamicFilesObjectKeys, Props } from './interfaces';

import './styles.scss';

const DropZone = ({
  name, styles, quantity, type, multiple,
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<DynamicFilesObjectKeys | null>(null);
  const [icons] = useState({
    pdf: '../../../../images/pdf.png',
    doc: '../../../../images/doc.png',
    xls: '../../../../images/xls.png',
    unknown: '../../../../images/unknown.png',
  });
  const [dragHover, setDragHower] = useState(false);
  const [validation, setValidation] = useState({
    quantity: false,
    fileType: false,
  });

  const handleDeleteFile = (key: string) => {
    const result: DynamicFilesObjectKeys | null = { ...files };
    delete result[key];
    if (Object.keys(result).length > 0) return setFiles(result);
    setFiles(null);
  };

  const readImage = (file: File, index: number) => {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
      let src = '';
      if (file.type.indexOf('pdf')) src = icons.pdf;
      if (file.type.indexOf('vnd')) {
        const type = file.type.split('.');
        if (type[type.length - 1] === 'document') src = icons.doc;
        if (type[type.length - 1] === 'sheet') src = icons.xls;
      }
      if (src === '') src = icons.unknown;
      const key: string = uuidv4();
      return setFiles((prev) => ({ ...prev, [key]: { file, src } }));
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      // setFiles((prev) => ({ ...prev, [uuidv4()]: { file, src: event.target.result } }));
    });
    reader.readAsDataURL(file);
  };

  const handleFilesObject = (files: FileList | null) => {
    if (!files) return;
    const result: DynamicFilesObjectKeys = {};
    Object.values(files).forEach((file: File, i: any) => {
      // result[i] = { file };
      readImage(file, i);
    });
  };

  const stopEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    setDragHower(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    setDragHower(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    const file: FileList | null = (event.target as HTMLInputElement).files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      setDragHower(false);
      return;
    }
    if (type && file && file[0].type && file[0].type.indexOf(type) === -1) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      setDragHower(false);
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false }));
    setValidation((prev) => ({ ...prev, fileType: false }));
    handleFilesObject(file);

    setDragHower(false);
  };

  const openFileDialog = () => {
    const input = fileInputRef.current;
    if (input) input.click();
  };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file: FileList | null = event.target.files;
    if (quantity && files && Object.keys(files).length >= quantity) {
      setValidation((prev) => ({ ...prev, quantity: true }));
      return;
    }
    if (type && file && file[0].type && file[0].type.indexOf(type) === -1) {
      setValidation((prev) => ({ ...prev, fileType: true }));
      return;
    }
    setValidation((prev) => ({ ...prev, quantity: false }));
    setValidation((prev) => ({ ...prev, fileType: false }));
    handleFilesObject(file);
  };

  // useEffect(() => {
  //   if (files) {
  //     const result: [] = [];
  //     Object.keys(files).forEach((item: string) => {
  //       result.push(files[item].file);
  //     });
  //     dispatch(dropZoneAction({ [name]: result }));
  //   } else dispatch(dropZoneAction({ [name]: null }));
  // }, [files]);

  // useEffect(() => {
  //   validation.fileType && dispatch(showMessage({
  //     message: 'Invalid file type',
  //     variant: 'error',
  //   }));
  //   validation.quantity && dispatch(showMessage({
  //     message: `Maximum files quantity is ${quantity}`,
  //     variant: 'error',
  //   }));
  // });

  return (
    <div className={styles}>
      <div
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={'drop-zone__container'}
        style={files ? { justifyContent: 'space-between', borderColor: dragHover ? '#0238e8' : ' #d0d0d0' } : { margin: 0, justifyContent: 'center', borderColor: dragHover ? '#0238e8' : ' #d0d0d0' }}
      >
        { !files
          ? <img alt='clip icon' src='../../../../images/clip.png' />
          : <div className='drop-zone__preview-container' >
              {
                Object.keys(files).map((file) => (
                  <div key={file} className='drop-zone__image-container'>
                    {/* {console.log(files[file].src)}
                    <img className='drop-zone__image' alt='preview' src={files[file].src} />
                    <Chip
                      className={classes.chipButton}
                      deleteicon={<RemoveIcon />}
                      size='medium'
                      onDelete={() => handleDeleteFile(file)}
                    /> */}
                  </div>
                ))
              }
            </div>
        }
        <input
          ref={fileInputRef}
          type='file'
          multiple={!!multiple}
          onChange={onFilesAdded}
        />
        <div className='drop-zone__drag-files'>
          <p>Drag files or click</p>
          <p>here to upload</p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
