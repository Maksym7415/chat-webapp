import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chipButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    paddingRight: '10px',
    // left: '50%',
    // transform: 'translate(-50%, 0)',
    width: '30px',
    height: '30px',
    top: '-10px',
    right: '0px',
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
}));
