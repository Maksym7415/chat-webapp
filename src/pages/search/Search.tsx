import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Header from "./components/header";
import SearchMain from "./components/searchMain";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "../../config/constants/general";
import { getSearchContactRequest } from "../../reduxToolkit/search/requests";
import { actionCreateNewConversation } from "../../actions/conversations";
import { setSideLeftConfigAction } from "../../reduxToolkit/app/slice";
import { eSideLeftConfigPage } from "../../ts/enums/app";
import { useAppDispatch } from "../../hooks/redux";

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "auto",
  },
}));

const Search = ({ params, heightContent }: any) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  // STATES
  const [settings, setSettings] = React.useState<any>({
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
  React.useLayoutEffect(() => {
    // set setting options from screen
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
    <div className={classes.container} style={{ height: heightContent }}>
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
            return (
              <SearchMain
                onClickContact={(item) => {
                  actionCreateNewConversation(history, item);
                  dispatch(
                    setSideLeftConfigAction({
                      page: eSideLeftConfigPage.conversations,
                    })
                  );
                }}
              />
            );

          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default Search;
