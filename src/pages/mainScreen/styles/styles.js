import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  messagesDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '80%',
    margin: '0 auto',
    marginBottom: '25px',
  },
  paperSenderMessage: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  paperFriendMessage: {
    background: 'linear-gradient(90deg, rgba(246,120,18,1) 35%, rgba(252,61,23,1) 69%)',
  },
  dateSender: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    color: '#e8e8e8',
  },
  messageText: {
    maxWidth: '80%',
    color: '#e8e8e8',
  },
}));
