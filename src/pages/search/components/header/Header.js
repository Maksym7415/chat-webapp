import React from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
// import HeaderLayout from "../../../../components/header";
import SvgMaker from "../../../../components/svgMaker";
import { useDebounce } from "../../../../hooks/useDebounce";

const Header = ({
  placeholder,
  textInputProps = {},
  getRequest,
  styles,
  svgFill = "#868686",
}) => {
  // HOOKS
  const dispatch = useDispatch();
  const theme = useTheme();

  // STATES
  const [search, setSearch] = React.useState("");

  // CUSTOM HOOKS
  const debouncedSearchValue = useDebounce(search, 300);

  // STYLES
  const classes = useStyles(theme);

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

  return (
    <></>
    // <HeaderLayout
    //   styles={{
    //     container: classes.container,
    //     top: classes.containerTop,
    //     ...styles?.headerLayout,
    //   }}
    //   svgMakerOptions={{
    //     strokeFill: svgFill,
    //   }}
    //   renderTopCenterComponent={() => (
    //     <div style={classes.wrpperSelectedAmount}>
    //       {/* <TextInput
    //         style={{...classes.input, ...styles?.input}}
    //         secureTextEntry={false}
    //         onChangeText={onChangeText}
    //         value={search}
    //         placeholder={placeholder}
    //         dense={true}
    //         underlineColor="transparent"
    //         onBlur={() => console.log('onBlur')}
    //         autoFocus={true}
    //         {...textInputProps}
    //       /> */}
    //     </div>
    //   )}
    //   renderTopRightComponent={() =>
    //     search ? (
    //       <div onClick={clearSearch}>
    //         <SvgMaker name="svgs_filled_cross" strokeFill={svgFill} />
    //       </div>
    //     ) : null
    //   }
    // />
  );
};

export default Header;
