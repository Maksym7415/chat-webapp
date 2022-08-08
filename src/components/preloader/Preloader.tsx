import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootState } from '../../redux/reducer';
import './styles.scss';

export default function Preloader() {
  // SELECTORS
  const isShow = useSelector(({ commonReducer }: RootState) => commonReducer.preloader);

  return (
    <>
        {isShow && <div className='preloader absolute'>
          <CircularProgress />
          </div>}
    </>
  );
}
