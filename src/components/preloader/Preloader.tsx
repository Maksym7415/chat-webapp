import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootState } from '../../redux/reducer';

export default function Preloader() {
  const isShow = useSelector(({ CommonReducer: { isShow } }: RootState) => isShow);
  return (
    <>
        {isShow && <CircularProgress />}
    </>
  );
}
