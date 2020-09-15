import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  TextField, Grid, InputAdornment, IconButton, Tooltip, Button,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer/index';
import { userInfoActionRequest } from '../../../redux/user/actions/actions';
import * as interfaces from '../../../redux/user/actions/interfaces';
import '../style/style.scss';

// interface CurrentInput {
//   value: string
//   isInput: boolean
// }

// interface InputData {
//   [key: string]: CurrentInput
// }

const imgs = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    active: false,
  },
  {
    id: 2,
    url: 'https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753',
    active: false,
  },
  {
    id: 3,
    url: 'https://image.winudf.com/v2/image/Y29tLm5pZ2h0c2t5d2FsbHBhcGVyLmhkLm5pZ2h0c2t5cGljdHVyZXMucGhvdG9zLmJhY2tncm91bmQuY3V0ZS5jb29sLmFydC5uaWdodHNreWltYWdlcy5oZC5mcmVlX3NjcmVlbl81XzE1MzMyNTAxODdfMDM4/screen-5.jpg?fakeurl=1&type=.jpg',
    active: false,
  },
];
// let index = 0;

function UserProfile() {
  const dispatch = useDispatch();

  const userId = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload.userId);
  const userInfo = useSelector(({ userReducer }: RootState) => userReducer.userInfo.success);
  const [userData, setUserData] = useState<any>({});
  const [images, setImages] = useState<any>(imgs);
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
    console.log(index);
    if (direction === 'forward') {
      if (index >= imgs.length - 1) {
        return setIndex(0);
      }
      setIndex(() => index + 1);
    } else {
      if (index <= 0) {
        // index = imgs.length - 1;
        return setIndex(imgs.length - 1);
      }
      return setIndex(() => index - 1);
    }
  };

  useEffect(() => {
    dispatch(userInfoActionRequest(userId));
  }, [userId]);

  useEffect(() => {
    setUserData(() => {
      const obj:any = {};
      const {
        firstName, lastName, fullName, tagName, userAvatar, ...inputs
      } = userInfo.data;
      [
        { name: 'firstName', value: firstName },
        { name: 'lastName', value: lastName },
        { name: 'fullName', value: fullName },
        { name: 'tagName', value: tagName },
      ].forEach(({ name, value }: any) => {
        obj[name] = { value, isInput: false, name };
      });
      return obj;
    });
  }, [userInfo]);
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

            {item.name}: {item.value && item.isInput === true
              ? <TextField
                id="standard-basic"
                size='small'
                name = {item.name}
                onChange={changeHandler}
                value={item.value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => convertToInputAndToDiv(item.name, item.value || 'Добавьте', false)}
                        edge="end"
                      >
                        <DoneIcon fontSize='small'/>
                      </IconButton>

                    </InputAdornment>
                  ),
                }}
              />
              : <Tooltip placement="left-start" title={`Tap to edit - ${item.name}`}>
                    <div style={{
                      cursor: 'pointer', height: '29px', borderBottom: '1px solid', fontSize: '1rem',
                    }} onClick = {() => convertToInputAndToDiv(item.name, item.value || 'Добавьте', true)}>{item.value || 'Добавьте'}</div>
                </Tooltip>}
          </div>
        ))}
    </Grid>
    <Grid item xs={5} style={{ margin: '20px' }}>
      <div className='carousel relative'>
        <div className='absolute carousel__images-container'>
          <img className='carousel__images-container__images br-5' src={imgs[index].url} ></img>
        </div>
        <div className='absolute carousel__buttons-container'>
          <div className='carousel__buttons-container__button-wrapper'>
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => changeImage('back')}
            >
              <ArrowLeftIcon fontSize='small'/>
            </IconButton>
          </div>
          <div className='carousel__buttons-container__button-wrapper'>
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => changeImage('forward')}
            >
              <ArrowRightIcon fontSize='small'/>
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
              // onChange={handleChangeAvatarHandler}
            />
            <label htmlFor="contained-button-file">
              <Button className='carousel__options__upload-container__btn' variant="contained" color="primary" component="span" fullWidth>
                Загрузить ещё
              </Button>
            </label>
          </div>
          <div className='carousel__options__upload-container'>
            <Button className='carousel__options__upload-container__btn' variant="contained" color="primary" component="span" fullWidth>
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
