/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import {
  TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  getAvatarsAction, setMainPhotoAction, clearDataAction, uploadAvatarAction, updateUserProfileAction,
} from '../../../redux/user/constants/actions';
import '../style/style.scss';
import DefaultAvatar from '../../../components/defaultAvatar';
import { UserInfoSuccess } from '../../../redux/user/constants/interfaces';
import languages from '../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function UserProfile() {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const userId = useAppSelector(({ authReducer }) => authReducer.tokenPayload.userId);
  const userInfo = useAppSelector(({ userReducer }) => userReducer.userInfo.success);
  const avatars = useAppSelector(({ userReducer }) => userReducer.avatars.success.data);
  const uploadAvatarMessage = useAppSelector(({ userReducer }) => userReducer.upload.success.data);
  const setPhotoMessage = useAppSelector(({ userReducer }) => userReducer.setMainPhoto.success.data);

  // STATES
  const [userData, setUserData] = useState<UserInfoSuccess | object>({});
  const [index, setIndex] = useState<number>(0);

  // FUNCTIONS
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

  const removeAvatar = () => {
    // console.log(avatars[index].id, 'removeAvatar');
  };

  const handleUpdateProfileRequest = (item: any) => {
    convertToInputAndToDiv(item.name, item.value, false);
    dispatch(updateUserProfileAction({ [item.name]: item.value }));
  };

  // USEEFFECTS
  useEffect(() => {
    dispatch(getAvatarsAction());
  }, []);

  useEffect(() => {
    if (uploadAvatarMessage) {
      dispatch(clearDataAction());
      setIndex(avatars.length - 1);
    } else if (setPhotoMessage) {
      dispatch(clearDataAction());
      setIndex(0);
    }
  }, [avatars]);

  useEffect(() => {
    setUserData(() => {
      const obj: any = {};
      const {
        firstName, lastName, tagName, userAvatar, ...inputs
      } = userInfo.data;
      [
        { name: 'firstName', value: firstName },
        { name: 'tagName', value: tagName },
      ].forEach(({ name, value }: any) => {
        obj[name] = { value, isInput: false, name };
      });
      return obj;
    });
  }, [userInfo]);
  // {avatars[index] === undefined ?
  //   <div className=' carousel__images-container'>
  //   <DefaultAvatar name={`${userInfo.data.firstName} ${userInfo.data.lastName}`} width='300px' height='300px' fontSize='1.1rem' /> </div> : <div className=' carousel__images-container'>
  //      {!!avatars.length && <img className='carousel__images-container__images br-5' src={`http://localhost:8081/${avatars[index].fileName}`} ></img>}

  return (
    <div style={{ width: '100%' }}>
       <div style={{ marginBottom: '20px' }}>
        <div className='carousel relative full-w'>
         {
          <div className=' carousel__images-container'>
            {avatars[index] === undefined ? <DefaultAvatar name={`${userInfo.data.firstName} ${userInfo.data.lastName}`} width='300px' height='300px' fontSize='5.5rem' /> : !!avatars.length && <img className='carousel__images-container__images br-5' src={`${process.env.REACT_APP_BASE_URL}/${avatars[index].fileName}`} ></img>}
          </div>}
          {
            avatars.length > 1
              ? <div className='carousel__buttons-container'>
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
              : null
          }

          <div className='absolute carousel__options'>
            <div className='carousel__options__upload-container'>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={uploadAvatar}
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className='carousel__options__upload-container__btn'
                >
                  <AddAPhotoIcon fontSize='small' />
                </IconButton>
              </label>
            </div>
            <div className='carousel__options__upload-container'>
                {avatars[index] && <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className='carousel__options__upload-container__btn'
                  onClick={removeAvatar}
                >
                  {<DeleteIcon />}
                </IconButton>}
            </div>
            <div className='carousel__options__upload-container'>
                {avatars[index] && <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className='carousel__options__upload-container__btn'
                  onClick={setMainPhoto}
                >
                  {avatars[index]?.defaultAvatar === true ? <CheckCircleIcon fontSize='small'/> : <CheckCircleOutlineIcon/>}
                </IconButton>}
              {/* <Button className='carousel__options__upload-container__btn' onClick={setMainPhoto} variant="contained" color="primary" component="span" fullWidth>
                Основное фото
            </Button> */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '0px 75px' }}>
        {userInfo && userInfo.data && Object.values(userData).map((item: any) => (
            <div
              key={item.name}
              style={{ display: 'flex', flexDirection: 'column-reverse', marginBottom: '10px' }}
            >

              <div>{`${languages[lang].generals.clickToChange} ${item.name}`}</div>{item.isInput === true
                ? <TextField
                  id="standard-basic"
                  size='small'
                  name={item.name}
                  onChange={changeHandler}
                  onBlur={() => convertToInputAndToDiv(item.name, item.value, true)}
                  value={item.value}
                  autoFocus
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
                : <div style={{
                  cursor: 'pointer', height: '29px', borderBottom: '1px solid', fontSize: '1rem',
                }} onClick={() => convertToInputAndToDiv(item.name, item.value, true)}>{item.value}</div>
                }
            </div>
        ))}
      </div>
      </div>
  );
}

export default UserProfile;
