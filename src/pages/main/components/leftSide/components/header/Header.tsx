import React from "react";
import { makeStyles } from "@mui/styles";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { getSearchContactRequest } from "../../../../../../reduxToolkit/search/requests";
import { setSideLeftConfigAction } from "../../../../../../reduxToolkit/app/slice";
import { eSideLeftConfigPage } from "../../../../../../ts/enums/app";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "15px 5px",
  },
  containerTop: {
    display: "flex",
    alignItems: "center",
  },
  wrapperTopCenterComponent: {
    display: "flex",
  },
}));

const Header = React.forwardRef<HTMLDivElement, any>(({ children }, ref) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const sideLeftConfig = useAppSelector(
    ({ appSlice }) => appSlice.sideLeftConfig
  );

  // STATES
  const [settings, setSettings] = React.useState<any>({
    noSettings: true,
    topCenterComponent: {
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
    switch (sideLeftConfig.page) {
      case eSideLeftConfigPage.conversations:
        return setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            onFocus: () => {
              dispatch(
                setSideLeftConfigAction({
                  page: eSideLeftConfigPage.searchContacts,
                })
              );
            },
          },
        }));
      case eSideLeftConfigPage.searchContacts:
        return setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search",
            getRequest: getSearchContactRequest,
          },
        }));
      default:
        return null;
    }
  }, [sideLeftConfig]);

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.containerTop}>
        <TopLeftComponent />
        <div className={classes.wrapperTopCenterComponent}>
          <TopCenterComponent parentSettings={settings.topCenterComponent} />
        </div>
      </div>
      {children}
    </div>
  );
});

export default React.memo(Header);
