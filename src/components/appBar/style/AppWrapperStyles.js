import {
  makeStyles, fade,
} from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  searchWrapper: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      display: 'flex',
      justifyContent: 'start',
    },
    width: '100%',

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.45),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '75%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#000000',
    padding: theme.spacing(0.5, 0.5, 0.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
    outline: 'none',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  reactSearch: {
    width: '100%',
    height: '50vh',
    position: 'absolute',
    top: ' 40px',
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'auto',
  },
  hideReactSearch: {
    display: 'none',
  },
  searchContent: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
}));

{ /* <InputBase
                tabIndex={2}
                ref={ref}
                name='search'
                fullWidth
                placeholder="Search…"
                value={value}
                onChange={handlerSearch}
                onBlur={(e) => {
                  if (ref.current && ref.current.className.slice(0, 8) === 'MuiPaper' && reactSearch.length) return setHide(false);
                  setHide(true);
                  return blur(e);
                }}
                onFocus={() => {
                  if (ref.current && ref.current.className.slice(0, 8) === 'MuiPaper' && reactSearch.length) return setHide(false);
                }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              /> */ }
