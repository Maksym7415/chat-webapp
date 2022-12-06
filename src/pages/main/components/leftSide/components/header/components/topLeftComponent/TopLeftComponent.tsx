import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Popover, Typography } from "@mui/material";
import useStyles from "./styles";
import { useAppDispatch } from "../../../../../../../../hooks/redux";
import { setDrawerStateAction } from "../../../../../../../../reduxToolkit/app/slice";

function TopLeftComponent({ contentState }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.container}>
      {(() => {
        if (["main"].includes(contentState)) {
          return (
            <>
              <IconButton
                color="default"
                aria-label="menu"
                edge="end"
                onClick={(event) => {
                  dispatch(
                    setDrawerStateAction({
                      anchor: "left",
                      open: true,
                      type: "main",
                    })
                  );
                }}
              >
                <MenuIcon />
              </IconButton>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>I use Popover.</Typography>
              </Popover>
            </>
          );
        }
      })()}
    </div>
  );
}

export default TopLeftComponent;
