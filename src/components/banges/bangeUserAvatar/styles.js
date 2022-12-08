import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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
