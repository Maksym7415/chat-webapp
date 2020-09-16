import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  TextField, Grid, InputAdornment, IconButton, Tooltip, Button,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/index';
import {
  userInfoActionRequest, getAvatarsAction, setMainPhotoAction, clearDataAction, uploadAvatarAction, updateUserProfileAction,
} from '../../../redux/user/constants/actions';
import * as interfaces from '../../../redux/user/constants/interfaces';
import '../style/style.scss';

// interface CurrentInput {
//   value: string
//   isInput: boolean
// }

// interface InputData {
//   [key: string]: CurrentInput
// }

interface Ref {
  [x: string]: any;
}

function UserProfile() {
  const dispatch = useDispatch();

  const ref = useRef<Ref>();
  const userId = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload.userId);
  const userInfo = useSelector(({ userReducer }: RootState) => userReducer.userInfo.success);
  const avatars = useSelector(({ userReducer }: RootState) => userReducer.avatars.success.data);
  const uploadAvatarMessage = useSelector(({ userReducer }: RootState) => userReducer.upload.success.data);
  const [userData, setUserData] = useState<any>({});
  const [index, setIndex] = useState<number>(0);

  const convertToInputAndToDiv = (id: string, value: string, isInput: boolean) => {
    setUserData((prev: any) => ({ ...prev, [id]: { value, isInput, name: id } }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUserData((prev: any) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name], value: e.target.value, isInput: true, name: e.target.name,
      },
    }));
  };
  const changeImage = (direction: string) => {
    if (direction === 'forward') {
      if (index >= avatars.length - 1) {
        return setIndex(0);
      }
      setIndex(() => index + 1);
    } else {
      if (index <= 0) {
        // index = imgs.length - 1;
        return setIndex(avatars.length - 1);
      }
      return setIndex(() => index - 1);
    }
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = event.target.files;
    const formData = new FormData();
    if (file) {
      formData.append('file', file[0]);
      dispatch(uploadAvatarAction(formData));
    }
  };

  const setMainPhoto = () => {
    dispatch(setMainPhotoAction(userId, avatars[index].fileName, avatars[index].id));
  };

  const handleUpdateProfileRequest = (item: any) => {
    convertToInputAndToDiv(item.name, item.value, false);
    dispatch(updateUserProfileAction({ [item.name]: item.value }));
  };

  useEffect(() => {
    dispatch(getAvatarsAction());
  }, []);

  useEffect(() => {
    if (uploadAvatarMessage) {
      dispatch(clearDataAction());
      setIndex(avatars.length - 1);
    }
  }, [avatars]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [userData]);

  useEffect(() => {
    setUserData(() => {
      const obj: any = {};
      const {
        firstName, lastName, tagName, userAvatar, ...inputs
      } = userInfo.data;
      [
        { name: 'firstName', value: firstName },
        { name: 'lastName', value: lastName },
        { name: 'tagName', value: tagName },
      ].forEach(({ name, value }: any) => {
        obj[name] = { value, isInput: false, name };
      });
      return obj;
    });
  }, [userInfo]);

  console.log(userData);

  return (
    // userInfo && userInfo.data && <div>{userInfo.data.fullName}</div>
    <Grid container xs={12} item>
      <Grid item xs={5} style={{ margin: '20px' }}>
        {userInfo && userInfo.data && Object.values(userData).map((item: any) => (
          <div style={{
            display: 'grid', gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', marginBottom: '10px', fontSize: '1rem', alignItems: 'center',
          }}
            key={item.name}
          >

            {item.name}: {item.isInput === true
              ? <TextField
                inputRef={ref}
                id="standard-basic"
                size='small'
                name={item.name}
                onChange={changeHandler}
                value={item.value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleUpdateProfileRequest(item)}
                        edge="end"
                      >
                        <DoneIcon fontSize='small' />
                      </IconButton>

                    </InputAdornment>
                  ),
                }}
              />
              : <Tooltip placement="left-start" title={`Tap to edit - ${item.name}`}>
                <div style={{
                  cursor: 'pointer', height: '29px', borderBottom: '1px solid', fontSize: '1rem',
                }} onClick={() => convertToInputAndToDiv(item.name, item.value, true)}>{item.value}</div>
              </Tooltip>}
          </div>
        ))}
      </Grid>
      <Grid item xs={5} style={{ margin: '20px' }}>
        <div className='carousel relative'>
          <div className='absolute carousel__images-container'>
            {!!avatars.length && <img className='carousel__images-container__images br-5' src={`http://localhost:8081/${avatars[index].fileName}`} ></img>}
          </div>
          <div className='absolute carousel__buttons-container'>
            <div className='carousel__buttons-container__button-wrapper'>
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => changeImage('back')}
              >
                <ArrowLeftIcon fontSize='small' />
              </IconButton>
            </div>
            <div className='carousel__buttons-container__button-wrapper'>
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={() => changeImage('forward')}
              >
                <ArrowRightIcon fontSize='small' />
              </IconButton>
            </div>
          </div>
          <div className='absolute flex js-space-between carousel__options'>
            <div className='carousel__options__upload-container'>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={uploadAvatar}
              />
              <label htmlFor="contained-button-file">
                <Button className='carousel__options__upload-container__btn' variant="contained" color="primary" component="span" fullWidth>
                  Загрузить ещё
              </Button>
              </label>
            </div>
            <div className='carousel__options__upload-container'>
              <Button className='carousel__options__upload-container__btn' onClick={setMainPhoto} variant="contained" color="primary" component="span" fullWidth>
                Основное фото
            </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
