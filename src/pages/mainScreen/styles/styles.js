import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dateSender: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    color: '#e8e8e8',
  },
  dateSenderChatlist: {
    color: '#252222',
  },
  bold: {
    fontWeight: 700,
  },
  messageTextInList: {
    width: '150px',
  },
  circularProgress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
