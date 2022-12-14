import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  Button,
  Typography,
  Input,
  FormControl,
  Paper,
  Chip,
  Grid,
  Popover,
  FormControlLabel,
  Checkbox,
  Avatar,
  Box,
} from "@mui/material";
import {
  useAutocomplete,
  AutocompleteGetTagProps,
} from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";
import useStyles from "./styles";
// import socket from "../../socket";
// import { fullDate } from "../../common/getCorrectDateFormat";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import DeleteItem from "../../../deleteItem/DeleteItem";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getSearchContactRequest } from "../../../../reduxToolkit/search/requests";
import UserAvatar from "../../../avatar/userAvatar";
import languages from "../../../../config/translations";

// need ts

// Setting the delay function
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { title: "Organise" },
  { title: "Joha" },
  { title: "Terminator" },
  { title: "Dull" },
  { title: "Nzaza" },
];
const NewChat = () => {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const loading = open && options.length === 0;
  const fetch = React.useMemo(() => {}, []);
  const searchContacts = useAppSelector(
    ({ searchSlice }) => searchSlice.searchContacts
  );

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...top5Songs]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    let active = true;
    // if (inputValue === "") {
    //   setOptions(value ? [value] : []);
    //   return undefined;
    // }

    // fetch({ input: inputValue }, (results) => {
    //   if (active) {
    //     let newOptions = [];
    //     if (value) {
    //       newOptions = [value];
    //     }
    //     if (results) {
    //       newOptions = [...newOptions, ...results];
    //     }
    //     setOptions(newOptions);
    //   }
    // });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getContacts = () => {
    dispatch(getSearchContactRequest({ params: { search: "" } }));
  };
  React.useEffect(() => {
    getContacts();
  }, []);

  console.log(searchContacts.response, "searchContacts.response");
  return (
    <Grid container className={classes.container}>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        // isOptionEqualToValue={(option: any, value: any) =>
        //   option.title === value.title
        // }
        getOptionLabel={(option: any) => option.fullName}
        renderOption={(props, option, index) => (
          <Box
            component="li"
            {...props}
            className={classes.wrapperContact}
            key={option.id}
          >
            <div className={classes.avatarView}>
              <UserAvatar
                source={option.userAvatar}
                status={[1, 3].includes(option.id) ? "online" : ""}
                name={option.fullName}
                sizeAvatar={38}
              />
            </div>
            <div className={classes.wrapperInfo}>
              <p className={classes.fullName}>{option.fullName}</p>
              <p className={classes.login}>{option.login}</p>
            </div>
          </Box>
        )}
        options={searchContacts.response}
        multiple
        loading={loading}
        // filterOptions={(x) => x}
        // filterSelectedOptions
        onChange={(event, newValue) => {
          setSelectedUsers(newValue);
          return { event, newValue };
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Contacts"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Button
        autoFocus
        className={classes.createChatButton}
        variant="contained"
        // onClick={createChat}
      >
        {languages[lang].generals.createAChat}
      </Button>
    </Grid>
  );
};

export default NewChat;
