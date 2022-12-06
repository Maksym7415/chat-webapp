import React, { useLayoutEffect } from "react";
import useStyles from "./styles";
import TopCenterComponent from "./components/topCenterComponent";
import TopLeftComponent from "./components/topLeftComponent";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { getSearchContactRequest } from "../../../../../../reduxToolkit/search/requests";

export default function Header({ children }) {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );
  // STATES
  const [contentState, setContentState] = React.useState("main");
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

  // FUNCTIONS

  // USEEFFECTS
  useLayoutEffect(() => {
    // set setting options from screen
    console.log("render - useLayoutEffect");
    switch (contentState) {
      case "main":
        return setSettings(() => ({
          topCenterComponent: {
            placeholder: "Search hi",
            getRequest: getSearchContactRequest,
          },
        }));

      default:
        return null;
    }
  }, []);

  // RENDERS
  const renderTopRightComponent = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.containerTop}>
        <TopLeftComponent contentState={contentState} />
        <div className={classes.wrapperTopCenterComponent}>
          <TopCenterComponent
            contentState={contentState}
            parentSettings={settings.topCenterComponent}
          />
        </div>
        {/* {renderTopRightComponent()} */}
      </div>
      {children}
    </div>
  );
}
