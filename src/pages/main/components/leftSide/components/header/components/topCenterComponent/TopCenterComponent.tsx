import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput } from "@mui/material";
import useStyles from "./styles";
import { useAppDispatch } from "../../../../../../../../hooks/redux";
import { useDebounce } from "../../../../../../../../hooks/useDebounce";

function TopCenterComponent({ contentState, parentSettings }: any) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // STATES
  const [search, setSearch] = React.useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // FUNCTIONS
  const clearSearch = () => {
    setSearch("");
  };
  const onChangeText = (e) => {
    setSearch(e.target.value);
  };

  // USEEFFECTS
  React.useEffect(() => {
    parentSettings.getRequest &&
      dispatch(
        parentSettings.getRequest({
          params: {
            search: debouncedSearchValue,
          },
        })
      );
  }, [debouncedSearchValue]);

  return (
    <>
      {(() => {
        if (["main"].includes(contentState)) {
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
            />
          );
        }
      })()}
    </>
  );
}

export default TopCenterComponent;
