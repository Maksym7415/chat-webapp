import React, { useLayoutEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import Header from "./components/header";
import SearchMain from "./components/searchMain";
import SearchProfile from "./components/searchProfile";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "../../config/constants/general";
import { getSearchContactRequest } from "../../reduxToolkit/search/requests";

const Search = ({ params }) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);

  // STATES
  const [settings, setSettings] = useState({
    noSettings: true,
    header: {
      placeholder: "Search",
      getRequest: "",
      styles: {
        headerLayout: {},
      },
    },
  });

  // USEEFFECTS
  useLayoutEffect(() => {
    // set setting options from screen
    console.log("render - useLayoutEffect");
    switch (params?.from) {
      case TYPES_FROM_TO_SEARCH_SCREEN.main:
        return setSettings(() => ({
          header: {
            placeholder: "Search",
            getRequest: getSearchContactRequest,
          },
        }));
      case TYPES_FROM_TO_SEARCH_SCREEN.profile:
        return setSettings(() => ({
          header: {
            placeholder: "Search settings and questions",
            getRequest: null,
            styles: {
              headerLayout: {
                container: { backgroundColor: theme.colors.main },
              },
            },
            svgFill: "#ffffff",
            textInputProps: {
              placeholderTextColor: "#ffffff",
              activeUnderlineColor: "#ffffff",
            },
          },
        }));
      default:
        return null;
    }
  }, []);

  if (settings.noSettings) {
    return <></>;
  }

  return (
    <div className={classes.container}>
      {![TYPES_FROM_TO_SEARCH_SCREEN.main].includes(params?.from) && (
        <Header
          placeholder={settings.header.placeholder}
          getRequest={settings.header.getRequest}
          textInputProps={settings.header.textInputProps}
          styles={settings.header.styles}
          svgFill={settings.header?.svgFill || "#868686"}
        />
      )}
      {(() => {
        switch (params?.from) {
          case TYPES_FROM_TO_SEARCH_SCREEN.main:
            return <SearchMain />;
          case TYPES_FROM_TO_SEARCH_SCREEN.profile:
            return <SearchProfile />;
          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default Search;
