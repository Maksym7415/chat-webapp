import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useDebounce } from "../../../../hooks/useDebounce";

// need ts
// rework

const Header = ({
  placeholder,
  textInputProps = {},
  getRequest,
  styles,
}: any) => {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // STATES
  const [search, setSearch] = React.useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // FUNCTIONS
  const clearSearch = () => {
    setSearch("");
  };
  const onChangeText = (value) => {
    setSearch(value);
  };

  // USEEFFECTS
  React.useEffect(() => {
    getRequest &&
      dispatch(
        getRequest({
          params: {
            search: debouncedSearchValue,
          },
        })
      );
  }, [debouncedSearchValue]);

  return <></>;
};

export default Header;
