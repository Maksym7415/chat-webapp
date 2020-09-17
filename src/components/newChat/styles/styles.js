import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: '10px',
    height: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '40px',
    position: 'absolute',
    top: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginBottom: '10px',
    backgroundColor: fade(theme.palette.primary.main, 0.45),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
    // marginRight: theme.spacing(4),
    // marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  // resultsContainer: {
  //   width: '100%',
  // },
  inputRoot: {
    color: '#000000',
    padding: theme.spacing(0.5, 0.5, 0.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    outline: 'none',
  },
  newChatAddContactWraper: {
    display: 'flex',
    flexDirection: 'column',
    // maxHeight: '40px',
    marginTop: theme.spacing(3),
  },
  newChatSearchWrapper: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'start',
    },
    width: '100%',
  },
  reactSearch: {
    width: '100%',
    maxHeight: '200px',
    // position: 'absolute',
    // top: '40px',
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'auto',
    zIndex: 1000,
  },
  hideReactSearch: {
    display: 'none',
  },
  searchContent: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  chipWrapper: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxHeight: '120px',
    overflowY: 'auto',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));
