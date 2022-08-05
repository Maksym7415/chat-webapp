import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: '10px',
    width: '100%',
    height: '55vh',
    position: 'relative',
    overflow: 'hidden',
  },
  conversation: {
    display: 'flex',
    marginTop: theme.spacing(1),
    borderRadius: 100,
    transition: '.2s',
    '&:hover': {
      backgroundColor: '#b9e6e1',
      cursor: 'pointer',
    },
  },
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
  inputFilter: {
    width: '100%',
    // position: 'absolute',
    // left: '50%',
    // transform: 'translateX(-50%)',
    // width: '90%',
  },
  wrapperConversation: {
    display: 'flex',
    flexDirection: 'column',
    // maxHeight: '40px',
    overflow: 'auto',
    height: 'calc(100% - 40px)',
    marginTop: theme.spacing(1),
  },
  noUsersFound: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 600,
    height: '100%',
  },
}));
