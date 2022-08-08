import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss';

// hooks
import { useAppSelector } from '../../hooks/redux';

export default function Preloader() {
  // SELECTORS
  const isShow = useAppSelector(({ commonReducer }) => commonReducer.preloader);

  return (
    <>
        {isShow && <div className='preloader absolute'>
          <CircularProgress />
          </div>}
    </>
  );
}
