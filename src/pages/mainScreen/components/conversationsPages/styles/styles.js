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
    maxWidth: '500px',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    margin: '0 0 0 auto',
    '@media (max-width:1000px)': {
      margin: '0 0 0 40px',
    },
  },
  paperFriendMessage: {
    position: 'relative',
    padding: theme.spacing(1),
    display: 'flex',
    width: '90%',
    maxWidth: '500px',
    background: 'linear-gradient(90deg, rgba(246,120,18,1) 35%, rgba(252,61,23,1) 69%)',
    margin: '0 0 0 40px',
  },
  paperFileContainer: {
    width: '400px',
    backgroundColor: '#b5f5ca',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  paperFileContainerDialog: {
    width: '80%',
    backgroundColor: '#b5f5ca',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    marginBottom: '5px',
  },
  iconButton: {
    padding: '0 25px',
  },
  messageAvatar: {
    width: '30px',
    height: '30px',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));
