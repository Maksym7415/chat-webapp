import { makeStyles } from "@mui/styles";

const defaultContainder = (theme) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  borderWidth: 3,
  borderColor: theme.colors.white1,
  backgroundColor: theme.colors.green_bright1,
});

export default makeStyles((theme) => ({
  badge: {
    ...defaultContainder(theme),
  },
  selected: {
    ...defaultContainder(theme),
    borderRadius: 15,
  },
}));
