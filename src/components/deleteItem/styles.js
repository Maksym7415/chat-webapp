import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  deleteFileWrapper: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: -10,
    right: 10,
  },
  deleteFile: {
    width: '100%',
    height: '100%',
    padding: 0,
    '& > span ': {
      width: '20px',
      height: '20px',
      '& > svg': {
        width: '20px',
        height: '20px',
      },
    },
  },
}));
