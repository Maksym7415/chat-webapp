import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '500px',
  },
  actionsContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: '10px 20px',
  },
  buttonMargin: {
    marginLeft: '10px',
  },
  paperSenderMessage: {
    position: 'relative',
    display: 'flex',
    width: '90%',
    backgroundColor: theme.palette.primary.main,
    '& > *': {
      margin: theme.spacing(2),
    },
    margin: '0 0 0 auto',
  },
  paperFriendMessage: {
    background: 'linear-gradient(90deg, rgba(246,120,18,1) 35%, rgba(252,61,23,1) 69%)',
    margin: '0 auto 0 0',
  },
}));
