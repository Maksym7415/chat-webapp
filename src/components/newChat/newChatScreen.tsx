import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogContentText,
  Typography,
  Slide,
  Input,
  FormControl,
  InputAdornment,
  Paper,
  Chip,
  TextField,
  Grid,
  Popover,
  FormControlLabel,
  Checkbox,
  Avatar,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useStyles from "./styles/styles";
// import socket from "../../socket";
// import { fullDate } from "../../common/getCorrectDateFormat";
import { useDebounce } from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import DeleteItem from "../deleteItem/DeleteItem";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface Ref {
  [x: string]: any;
}

const _borderError = "1px solid red";

export default function NewChatScreen() {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // REFS
  const ref = useRef<HTMLDivElement>(null);
  const refInputFile = useRef<any>(null);
  const refContactWraper = useRef<any>(null);

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  // const searchResult = useAppSelector(({ globalSearchReducer }) => globalSearchReducer.globalSearchResult);
  // const { userId, firstName } = useAppSelector(({ authReducer }) => authReducer.authToken);

  // STATES
  const [searchvalue, setSearchValue] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);
  const [localSearchResult, setLocalSearchResult] = useState<Array<any>>([]);
  const [groupMembers, setGroupMembers] = useState<Array<any>>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [checked, setChecked] = useState<Ref>({});
  const [memberId, setMemberId] = useState(0);
  const [chatName, setChatName] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState({ name: "" });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [error, setError] = React.useState({
    chatName: {
      bool: false,
    },
    image: {
      bool: false,
    },
    chatSearch: {
      bool: false,
    },
  });

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce<string>(searchvalue, 500);
  useOnClickOutside(refContactWraper, () => setHide(true));

  // FUNCTIONS
  const handleDeleteAvatar = () => {
    refInputFile.current.value = "";
    setImageData({ name: "" });
    setImage("");
  };

  const handleCloseDialog = (isAddavatar: boolean) => {
    if (!isAddavatar) {
      handleDeleteAvatar();
    }
    if (isAddavatar) {
      setImageData(refInputFile.current.files[0]);
    }
    setOpenDialog(false);
  };

  const chipHandler = (event: any, id: number) => {
    setMemberId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const chipMember = groupMembers.find((el) => el.id === memberId);
    setChecked((prevChecked) => ({
      ...prevChecked,
      [memberId]: { ...chipMember, isAdmin: event.target.checked },
    }));
    setGroupMembers((prevMember) =>
      prevMember.map((el) =>
        el.id === memberId ? { ...el, isAdmin: event.target.checked } : el
      )
    );
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlerSearch = (event: any) => {
    event.persist();
    setSearchValue(event.target.value);
    setHide(false);
  };

  const handleAdd = (newMember: any) => {
    setLocalSearchResult((prevSearchResult) =>
      prevSearchResult.filter((item) => item.id !== newMember.id)
    );
    setGroupMembers((prevMembers) => {
      const { id, isAdmin, firstName, userAvatar, fullName, ...otherInfo } =
        newMember;
      return [
        ...prevMembers,
        {
          isAdmin: false,
          id,
          firstName,
          userAvatar,
          fullName,
        },
      ];
    });
  };

  const handleDelete = (chipToDelete: any) => () => {
    setLocalSearchResult((prevSearchResult) => [
      chipToDelete,
      ...prevSearchResult,
    ]);
    setGroupMembers((chips) =>
      chips.filter((chip) => chip.id !== chipToDelete.id)
    );
    setChecked((prevChecked) => {
      delete prevChecked[chipToDelete.id];
      return prevChecked;
    });
  };

  const handleChatNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChatName(event.target.value);
  };

  const createChat = () => {
    if (!groupMembers.length || !chatName) {
      let newErrors: any = {};
      if (!groupMembers.length) {
        newErrors.chatName = {
          bool: true,
        };
      }
      if (!chatName) {
        newErrors.chatSearch = {
          bool: true,
        };
      }
      if (!image) {
        newErrors.image = {
          bool: true,
        };
      }
      setError((prev) => ({
        ...prev,
        ...newErrors,
      }));
      return;
    }
    const fileExtension = imageData.name.split(".");
    // socket.emit(
    //   "chatCreation",
    //   // [...groupMembers, { id: userId, firstName, isAdmin: true }],
    //   // fullDate(new Date()),
    //   chatName,
    //   imageData,
    //   fileExtension[fileExtension.length - 1],
    //   (success: boolean) => {
    //     if (success) dispatch(hideDialogAction());
    //   }
    // );
  };

  const handleChangeAvatarHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: FileList | null = event.target.files;
    if (file) {
      // setImageData(file[0]);
      setImage(URL.createObjectURL(file[0]));
    }
    setOpenDialog(true);
  };

  // USEEFFECTS
  // useEffect(() => {
  //   let sortGroup: any = [];
  //   const groupMembersId = groupMembers.map((el) => el.id);
  //   if (!groupMembers.length) sortGroup = [...searchResult];
  //   else searchResult.forEach((el) => (groupMembersId.includes(el.id) ? null : sortGroup.push(el)));
  //   setLocalSearchResult([...sortGroup]);
  // }, [searchResult]);

  useEffect(() => {
    ref.current && ref.current.focus();
  }, [hide]);

  useEffect(() => {
    if (groupMembers.length) {
      error.chatSearch.bool &&
        setError((prev) => ({ ...prev, chatSearch: { bool: false } }));
    }
  }, [groupMembers]);

  useEffect(() => {
    // !hide && dispatch(initializedGlobalSearchAction(debouncedSearchValue));
  }, [debouncedSearchValue]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <TextField
          id="name"
          // label={languages[lang].newChatScreen.enterAGroupMame}
          variant="outlined"
          fullWidth
          required={true}
          size="small"
          onChange={handleChatNameHandler}
          style={{ border: error.chatName.bool ? _borderError : "" }}
        />
        {imageData?.name && (
          <div className={classes.wrapperImg}>
            <img src={image} />
            <DeleteItem
              settingWrapper={{
                style: {
                  top: "-5px",
                  right: "-10px",
                },
              }}
              settingWrapperIcon={{
                ariaLabel: "avatar group",
                // className: classes.deleteFile,
                onClick: () => handleDeleteAvatar(),
                component: "span",
              }}
            />
          </div>
        )}
        <input
          ref={refInputFile}
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleChangeAvatarHandler}
        />
        <label onClick={() => !image && refInputFile.current.click()}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            style={{
              marginTop: imageData?.name ? "10px" : "25px",
              border: error.image.bool ? _borderError : "",
            }}
            disabled={!!image}
          >
            {/* {languages[lang].newChatScreen.addGroupAvatar} */}
          </Button>
        </label>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* {languages[lang].generals.photo} */}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img src={image} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleCloseDialog(true)}
              color="primary"
              variant="contained"
            >
              {/* {languages[lang].generals.add} */}
            </Button>
            <Button
              onClick={() => handleCloseDialog(false)}
              color="primary"
              variant="contained"
            >
              {/* {languages[lang].generals.cancel} */}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.newChatAddContactWraper}
        ref={refContactWraper}
      >
        {!!groupMembers.length && (
          <div className={classes.chipWrapper}>
            <Paper component="ul" className={classes.chipRoot}>
              {groupMembers.map((data: any) => (
                <li key={data.id}>
                  <Chip
                    style={{ cursor: "pointer" }}
                    avatar={
                      <Avatar
                        alt=""
                        src={`${process.env.REACT_APP_BASE_URL}/${data.userAvatar}`}
                      />
                    }
                    label={data.firstName}
                    onDelete={handleDelete(data)}
                    onClick={(event) => chipHandler(event, data.id)}
                    className={classes.chip}
                  />
                </li>
              ))}
            </Paper>
            <Popover
              id={"popover"}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.popover}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#64c8bc" }}
                      checked={
                        checked[memberId] === undefined
                          ? false
                          : checked[memberId].isAdmin
                      }
                      onChange={handleChange}
                    />
                  }
                  label="Администратор"
                />
              </Typography>
            </Popover>
          </div>
        )}
        <div className={classes.newChatSearchWrapper}>
          <div
            className={classes.search}
            style={{ border: error.chatSearch.bool ? _borderError : "" }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <FormControl fullWidth>
              <Input
                ref={ref}
                className={classes.inputRoot}
                // placeholder={languages[lang].generals.chooseAContact}
                autoComplete="off"
                disableUnderline={true}
                id="standard-adornment-weight"
                value={searchvalue}
                onChange={handlerSearch}
                // onFocus={() => {
                //   if (searchResult.length) return setHide(false);
                // }}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
            {!!localSearchResult.length && (
              <Paper
                tabIndex={1}
                elevation={3}
                className={clsx(classes.reactSearch, {
                  [classes.hideReactSearch]: hide,
                })}
              >
                {localSearchResult.map((result: any) => (
                  <Paper
                    elevation={2}
                    key={result.id}
                    onClick={() => handleAdd({ ...result, isAdmin: false })}
                  >
                    <Typography
                      className={classes.searchContent}
                      variant="body1"
                    >
                      {result.firstName}
                    </Typography>
                  </Paper>
                ))}
              </Paper>
            )}
          </div>
        </div>
      </Grid>
      {/* </div> */}
      <Button
        autoFocus
        className={classes.createChatButton}
        variant="outlined"
        onClick={createChat}
      >
        {/* {languages[lang].generals.createAChat} */}
      </Button>
    </Grid>
  );
}
