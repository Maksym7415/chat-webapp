import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dateSender: {
    color: '#e8e8e8',
    marginLeft: 'auto',
    fontSize: '0.8rem',
  },
  dateSenderChatlist: {
    color: '#252222',
  },
  bold: {
    fontWeight: 700,
  },
  messageText: {
    maxWidth: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  circularProgress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  avatar: {
    width: '50px',
    height: '50px',
  },
}));
