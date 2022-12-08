import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import useStyles from "./styles";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../hooks/redux";
import { useDebounce } from "../../../../../../../../hooks/useDebounce";
import { eSideLeftConfigPage } from "../../../../../../../../ts/enums/app";

function TopCenterComponent({ parentSettings }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const sideLeftConfig: any = useAppSelector(
    ({ appSlice }) => appSlice.sideLeftConfig
  );

  // STATES
  const [search, setSearch] = React.useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // FUNCTIONS
  const onChangeText = (e) => {
    setSearch(e.target.value);
  };

  const getRequest = () => {
    parentSettings.getRequest &&
      dispatch(
        parentSettings.getRequest({
          params: {
            search: debouncedSearchValue,
          },
        })
      );
  };

  // USEEFFECTS
  React.useEffect(() => {
    getRequest();
  }, [debouncedSearchValue]);

  React.useEffect(() => {
    getRequest();
  }, [parentSettings]);

  return (
    <>
      {(() => {
        if (
          [
            eSideLeftConfigPage.conversationList,
            eSideLeftConfigPage.searchContacts,
          ].includes(sideLeftConfig.page)
        ) {
          return (
            <OutlinedInput
              id="outlined-adornment-weight"
              value={search}
              onChange={onChangeText}
              placeholder={parentSettings.placeholder}
              className={classes.inputSearch}
              startAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              onFocus={parentSettings.onFocus}
            />
          );
        }
      })()}
    </>
  );
}

export default TopCenterComponent;
